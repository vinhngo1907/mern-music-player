import React from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import { browserHistory, Link } from "react-router";
import { clearRequestInterval, requestInterval } from "../../requestInterval";
import { changeAlias, formatTime, isTwoObjectEqual } from "../../utils/func";
import initAnalyzer from "../../utils/initAnalyzer";
import { extractAlias } from "../../utils/func";
import LinksByComma from "../LinksByComma";
import PlayerLoader from "./PlayerLoader";
import "./index.sass";

class Player extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            progress: 0,
            isSeeKing: false,
            isPlaying: false,
            isLoop: false,
            isMuted: false,
            volume: 100
        }
    }

    componentDidMount() {
        window.addEventListener("blur", this.windowBlur.bind(this));
        this.audio = this.refs.audio;
        this.audio.addEventListener("loadeddata", this.onLoadedData.bind(this));
        this.audio.addEventListener("play", this.onPlay.bind(this));
        this.audio.addEventListener("pause", this.onPause.bind(this));
        this.audio.addEventListener("ended", this.onEnded.bind(this));
        this.audio.addEventListener('volumechange', this.handleVolumeChange);

        // initialize the audio player
        initAnalyzer(this.audio);
    }

    windowBlur() {
        if (this.state.isPlaying) {
            clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        clearRequestInterval(this.timer);
        this.audio.removeEventListener('volumechange', this.handleVolumeChange);
    }

    onLoadedData() {
        if (this.audio && this.audio.readyState >= 2) {
            this.audio.play();
        }
    }

    onPlay() {
        // console.log(["Play"]);
        this.timer = requestInterval(this.update.bind(this), 50);
        this.setState({ isPlaying: true });
    }

    onPause() {
        // console.log(["Pause"]);
        clearRequestInterval(this.timer);
        this.setState({ isPlaying: false });
    }

    onEnded() {
        this.playPrevOrNextSong("next");
        clearRequestInterval(this.timer);
    }

    toggleMute = () => {
        this.setState((prevState) => ({
            isMuted: !prevState.isMuted,
            volume: prevState.isMuted ? 100 : this.state.volume, // Restore volume when unmuting
        }));
    };

    handleVolumeChange = (e) => {
        // const volume = e.target.value;
        // this.setState({ volume });
        // if (this.audio) {
        //     this.audio.volume = volume / 100;
        // }
        const newVolume = Math.round(this.audio.volume * 100);
        this.setState({ volume: newVolume });
        // const newVolume = parseInt(e.target.value, 10);
        // this.setState({ volume: newVolume });

        // if (newVolume === 0) {
        //     this.setState({ isMuted: true });
        // } else {
        //     this.setState({ isMuted: false });
        // }
    };
    handleVolumeSliderChange = (event) => {
        const newVolume = parseInt(event.target.value, 10);
        this.setState({ volume: newVolume });
        this.audio.volume = newVolume / 100;
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.isPlaying !== this.state.isPlaying) {
            if (nextState.isPlaying) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        }

        if (
            !isTwoObjectEqual(nextProps.queueIds, this.props.queueIds) &&
            !nextProps.queueIds.includes(this.props.songData.id) &&
            nextProps.queue[0]
        ) {
            const { name, id } = nextProps.queue[0];
            this.props.fetchSong(changeAlias(name), id); // changeAlias {func}: escape ut8 character
            if (/\/song\//.test(window.location.href)) {
                console.log('>>>>>>', /\/song\//.test(window.location.href));
                console.log(">>>>>>", `/song/${changeAlias(name)}/${id}`);

                // only redirect if is on the song route
                browserHistory.push(`/song/${changeAlias(name)}/${id}`);
            }
        }
        const nextPercent = nextProps.playerState.playedPercent;
        const currentPercent = this.props.playerState.playedPercent;

        if (nextPercent !== currentPercent && nextPercent) {
            this.audio.currentTime = (this.audio.duration * nextPercent) / 100;
        }
    }

    findSong(prevOrNext) {
        const queue = this.props.queue;
        const currId = this.props.songData.id;
        let index;

        for (let i = 0, length = queue.length; i < length; i++) {
            if (queue[i].id === currId) {
                switch (prevOrNext) {
                    case "next":
                        index = (i + 1) % length;
                        break;
                    case "prev":
                        index = (i + length - 1) % length;
                        break;
                    default:
                        return null;
                }
                return queue[index];
            }
        }
        return undefined;
    }

    playPrevOrNextSong(prevOrNext) {
        const preveOrNextSong = this.findSong(prevOrNext);
        if (!prevOrNext) return;

        const { name, alias, id } = preveOrNextSong;
        this.props.togglePushRoute(true); // enable .push for browserHistory

        if (alias) {
            this.props.fetchSong(alias, id);
        } else {
            this.props.fetchSong(changeAlias(name), id)
        }
    }

    togglePlayBtn() {
        this.setState({ isPlaying: !this.state.isPlaying });
    }

    updateProgressBar() {
        // console.log(">>> current time", this.audio.currentTime);
        // console.log(">>> duration", this.audio.duration);

        let val = 0;
        if (this.audio.currentTime > 0) {
            val = ((this.audio.currentTime / this.audio.duration) * 100).toFixed(2);
        }

        if (!this.state.isSeeKing) {
            this.setState({ progress: val });
        }
    }

    update() {
        const lyric = this.props.songData.lyric;
        if (!lyric.length) {
            clearInterval(this.timer)
            return;
        }

        this.updateProgressBar();

        const {
            playerState: { lyric1, lyric2 },
            updateLyricPercent,
            updateLyric
        } = this.props;
        // console.log(">>>>>", this.audio)
        // reset lyric state
        if (
            this.audio.currentTime > lyric[lyric.length - 1].end ||
            this.audio.currentTime
        ) {
            // clear lyric when the this.audio is playing with beat only
            updateLyric([], []);
        }

        for (let i = 0; i < lyric.length; i++) {
            if (
                i < lyric.length - 1 &&
                i % 2 == 0 &&
                this.audio.currentTime >= lyric[i].start &&
                this.audio.currentTime <= lyric[i + 1].end
            ) {
                updateLyric(lyric[i], lyric[i + 1]);
            }
        }

        if (this.audio.currentTime <= lyric1.end) {
            let width =
                ((this.audio.currentTime - lyric1.start) /
                    (lyric1.end - lyric1.start)) *
                100;
            width = Math.ceil(width);
            updateLyricPercent(width, 0);
        } else if (this.audio.currentTime <= lyric2.end) {
            updateLyricPercent(null, 0);
            let width =
                ((this.audio.currentTime - lyric2.start) /
                    (lyric2.end - lyric2.start)) *
                100;
            width = Math.ceil(width);
            width = width <= 0 ? 0 : width > 96 ? 100 : width; // fill the karaoke text
            updateLyricPercent(100, width);
        }
    }

    handleChange(value) {
        // console.log(">>>>>", { value });
        this.setState({ progress: value, isSeeKing: true });
    }

    handleChangeComplete(value) {
        // console.log({ value });
        if (value == 100) {
            this.props.updateLyric([], [])
        }

        this.audio.play();

        if (this.audio.duration) {
            this.audio.currentTime = (value / 100) * this.audio.duration;
        }

        this.setState({ isSeeKing: false });
    }

    render() {
        const { songData, queue } = this.props;
        // console.log({ songData })
        const { id, title, link } = songData;
        const alias = extractAlias(link);

        return (
            <div className="player">
                <audio
                    autoPlay
                    src={songData.source && songData.source["128"]}
                    crossOrigin="anonymous"
                    ref="audio"
                    loop={this.state.loop}
                    muted={this.state.isMuted}
                    volume={this.state.isMuted ? 0 : this.state.volume / 100}
                />
                <img
                    src={songData.thumbnail}
                    className="player-song-thumbnail"
                    alt=""
                />
                <div className="player-info">
                    <Link
                        to={`/song/${alias}/${id}`}
                        className="ellipsis player-song-title"
                        title={songData.title}
                    >{title}
                    </Link>
                    <LinksByComma
                        className="ellipsis player-info-artists comma"
                        data={songData.artists}
                        titleEntry="name"
                        pathEntry="link"
                        definePath={link => link.replace("/nghe-si/", "/artist/")}
                        defineTitle={title =>
                            title.replace("Nhiều nghệ sĩ", "Various artists")
                        }
                    />
                </div>
                <div className="player-btns">
                    <button
                        className="sc-ir player-btn"
                        onClick={this.playPrevOrNextSong.bind(this, "prev")}
                    >
                        <i className="ion-ios-rewind"></i>
                    </button>
                    <button
                        className="sc-ir player-btn"
                        onClick={this.togglePlayBtn.bind(this)}
                    >
                        <i className={`ion-${this.state.isPlaying ? "pause" : "play"}`}></i>
                    </button>
                    <button
                        className="sc-ir player-btn"
                        onClick={this.playPrevOrNextSong.bind(this, "next")}
                    >
                        <i className="ion-ios-fastforward"></i>
                    </button>
                </div>
                <div className="player-volume">
                    <button
                        className="sc-ir player-btn"
                        onClick={this.toggleMute.bind(this)}
                        title="Volume"
                    >
                        <i
                            className={`icon ion-${this.state.isMuted ? 'android-volume-mute' : 'volume-medium'}`}
                            style={{ color: this.state.loop ? "#23B89A" : "#adb5bd" }}
                        />
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        // value={this.state.volume}
                        value={this.state.isMuted ? 0 : this.state.volume}
                        onChange={this.handleVolumeSliderChange.bind(this)}
                    />
                </div>
                <div className="player-seek">
                    <span>
                        {
                            this.audio && this.audio.currentTime
                                ? formatTime(this.audio.currentTime)
                                : "0:00"
                        }
                    </span>
                    <InputRange
                        maxValue={100}
                        minValue={0}
                        value={parseInt(this.state.progress, 10)}
                        onChange={this.handleChange.bind(this)}
                        onChangeComplete={this.handleChangeComplete.bind(this)}
                    />
                    <span>
                        {
                            this.audio &&
                            !isNaN(this.audio.duration) &&
                            formatTime(this.audio.duration)
                        }
                    </span>
                </div>
                <div className="player-other">
                    <button className="sc-ir" title="Loop">
                        <i
                            className="ion-loop"
                            style={{ color: this.state.loop ? "#23B89A" : "#adb5bd" }}
                            onClick={() => this.setState({ loop: !this.state.loop })}
                        ></i>
                    </button>
                    <button
                        className="sc-ir player-btn queue-btn"
                        onClick={this.props.toggleQueue}
                    >
                        <span className="queue-circle">{queue.length}</span>
                        <img src="/svg/playlist.svg" />
                    </button>

                </div>
                {this.props.isFetching && <PlayerLoader />}
            </div>
        )
    }

}

Player.propTypes = {
    playerState: PropTypes.object.isRequired,
    updateLyric: PropTypes.func.isRequired
}

export default Player;
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
            isLoop: false
        }
    }

    componentDidMount() {
        window.addEventListener("blur", this.windowBlur.bind(this));
        this.audio = this.refs.audio;
        this.audio.addEventListener("loadeddata", this.onLoadedData.bind(this));
        this.audio.addEventListener("play", this.onPlay.bind(this));
        this.audio.addEventListener("pause", this.onPause.bind(this));
        this.audio.addEventListener("ended", this.onEnded.bind(this));

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
    }

    onLoadedData() {
        if (this.audio.readyState >= 2) {
            this.audio.play();
        }
    }

    onPlay() {
        console.log(["Play"])
        this.timer = requestInterval(this.update.bind(this), 50);
        this.setState({ isPlaying: true });
    }

    onPause() {
        console.log(["Pause"]);
        clearRequestInterval(this.timer);
        this.setState({ isPlaying: false });
    }

    onEnded() {
        this.playPrevOrNextSong("next");
        clearRequestInterval(this.timer);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log({ nextState });
        // console.log(">>>>", { ...this.state })
        if (nextState.isPlaying !== this.state.isPlaying) {
            if (nextState.isPlaying) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
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
        this.setState({ progress: value, isSeeKing: true });
    }

    handleChangeComplete(value) {
        if (value == 100) {

        }
    }

    render() {
        const { songData, queue } = this.props;
        // console.log({ songData })
        const { id, title, link } = songData;
        const alias = extractAlias(link)
        return (
            <div className="player">
                <audio
                    autoPlay
                    src={songData.source && songData.source["128"]}
                    crossOrigin="anonymous"
                    ref="audio"
                    loop={this.state.loop}
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
                <div className="player-seek"></div>
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
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
        // window.addEventListener("blur", this.windowBlur.bind(this));
        this.audio = this.refs.audio;
        this.audio.addEventListener("loadeddata", this.onLoadedData.bind(this));
        this.audio.addEventListener("play", this.onPlay.bind(this));
        this.audio.addEventListener("pause", this.onPause.bind(this));
        this.audio.addEventListener("ended", this.onEnded.bind(this));

        // initialize the audio player
        initAnalyzer(this.audio);
    }

    onLoadedData() {

    }

    onPlay() {

    }

    onPause() {

    }

    onEnded() {

    }

    componentDidUpdate(nextProps, nextState) {

    }

    playPrevOrNextSong(prevOrNext) {

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
        console.log({ songData })
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
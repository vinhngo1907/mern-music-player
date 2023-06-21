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
        this.addEventListener("loadeddata", this.onLoadedData.bind(this));
        this.addEventListener("play", this.onPlay.bind(this));
        this.addEventListener("pause", this.onPause.bind(this));
        this.addEventListener("ended", this.onEnded.bind(this));

        // initialize the audio player
        initAnalyzer(this.audio);
    }

    onLoadedData(){

    }

    onPlay(){

    }

    onPause(){

    }

    onEnded(){

    }

    componentDidUpdate(){
        
    }
}

Player.propTypes = {
    playerState: PropTypes.object.isRequired,
    updateLyric: PropTypes.func.isRequired
}

export default Player;
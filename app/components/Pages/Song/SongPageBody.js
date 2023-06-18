import PropTypes from "prop-types";
import React from "react";
import "./index.sass";
import SuggestedSection from "./SuggestedSection";

const propTypes = {
    suggestedSongs: PropTypes.array.isRequired,
};

class SongPageBody extends React.Component {
    render() {
        return (
            <div className="song-body"></div>
        )
    }
}

SongPageBody.propTypes = propTypes;

export default SongPageBody;
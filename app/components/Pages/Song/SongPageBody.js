import PropTypes from "prop-types";
import React from "react";
import SuggestedSection from "./SuggestedSection";
import "./index.sass";

const propTypes = {
    suggestedSongs: PropTypes.array.isRequired,
};

class SongPageBody extends React.Component {
    render() {
        return (
            <div className="song-body">
                <SuggestedSection songs={this.props.suggestedSongs} />
            </div>
        )
    }
}

SongPageBody.propTypes = propTypes;

export default SongPageBody;
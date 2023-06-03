import PropTypes from "prop-types";
import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { Link } from "react-router";
// import LazyloadImage from "../LazyloadImage";
// import LinksByComma from "../LinksByComma";

const RenderButton = ({ alias, encodeId, download, streamingStatus }) => {
    if (streamingStatus == 2) {
        return (
            <button className="sc-ir">
                <i className="ion-android-remove-circle" title="download the track" />
            </button>
        )
    }
    return (
        <button
            className="sc-ir"
            onClick={() =>
                download({
                    songName: alias,
                    id: encodeId
                })
            }
        >
            <i className="ion-android-download" title="download the track" />
        </button>
    );
}
const Track = props => {
    const {
      link,
      alias,
      thumbnail,
      order,
      encodeId,
      title,
      artists,
      downloadProgress,
      streamingStatus
    } = props;
    const dataArtists = artists ? artists : [];
    const id = encodeId
    const name = title
    return (
        <li>
             {props.renderDropDown("Track", { id, name, thumbnail, artists })}
            <div className="trackPosition">{order}</div>
        </li>
    )
}
Track.propTypes = {
    renderDropDown: PropTypes.func.isRequired
  };
  
  export default Track;
  
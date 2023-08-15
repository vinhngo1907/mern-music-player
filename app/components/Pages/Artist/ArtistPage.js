import React from "react";
import WithBackgroundImage from "../../WithBgImg";
import Pagination from "../../Pagination";

const ArtistPage = (props) => {
    const { avatar, cover, songs, artistName, pageChunks, pageChunkIndex } = props;

    return (
        <div className="artist-page">
            <WithBackgroundImage className="artist-page-header" src={cover}>

            </WithBackgroundImage>
            <button onClick={() => props.replaceQueue(songs)} className="sc-ir" title="play">
                <img src="/svg/play-button-inside-a-circle.svg" className="circle-play-icon" />
            </button>
            
            <Pagination 
                pageChunkIndex={pageChunkIndex}
                pageChunks={pageChunks}
                type="single-artist"
                artistName={artistName}
                activePage={props.activePage}
            />
        </div>
    )
}

export default ArtistPage
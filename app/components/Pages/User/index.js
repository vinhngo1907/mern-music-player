import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.sass';

class UserPage extends React.Component {
    state = {
        showInput: false,
    };

    handleClickOutSide() {
        this.setState({ showInput: false });
    }

    handleOnClick() {
        this.setState({ showInput: true });
    }

    handleOnSubmit(e) {
        e.preventDefault();
    }
    renderInputField() {
        return this.state.showInput &&
            <form onSubmit={this.handleOnSubmit.bind(this)}>
                <input
                    type='text'
                    placeholder='Enter the playlist title'
                    className='form-control'
                    ref={node => this.input = node}
                />
            </form>;
    }

    render() {
        const { playlists } = this.props;
        return (
            <div className="user-page">
                <div className="user-page-left">
                    <button
                        className="playlist-btn"
                        onClick={this.handleOnClick.bind(this)}
                    >Create a playlist
                        <i className="ion-plus"></i>
                    </button>
                    {this.renderInputField()}
                    {playlists.map((playlist, index) => (
                        <Playlist
                            playlist={playlist}
                            key={`playlist-${index}-${playlist.title}`}
                            {...this.props}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

class Playlist extends React.Component { }

const List = ({ songs, dispatch, playlistTitle }) => { }

export default UserPage;
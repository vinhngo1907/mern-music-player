import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.sass';

class UserPage extends React.Component {
    render() {
        return (
            <div className="user-page">
                <div className="user-page-left">
                </div>
            </div>
        )
    }
}

class Playlist extends React.Component { }

const List = ({ songs, dispatch, playlistTitle }) => { }

export default UserPage;
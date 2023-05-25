import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _throttle from 'lodash.throttle';
import { fetchTracks } from '../actions/home';

const NUMBER_OF_PAGES = 5;


export default function (ComposedComponent) {
    class FetchOnScroll extends Component {
        constructor(props) {
            super(props);
            this.onScroll = this.onScroll.bind(this);
        }
    }
    FetchOnScroll.propTypes = {
        // fetchTracks: PropTypes.func.isRequired,
        pageLoaded: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        activeId: PropTypes.string.isRequired,
    };

    return connect((state) =>
    ({ pageLoaded: state.trackState.pageLoaded,
      isLoading: state.trackState.isLoading,
      activeId: state.trackState.activeId,
    }),
    { fetchTracks })
    (FetchOnScroll);
}
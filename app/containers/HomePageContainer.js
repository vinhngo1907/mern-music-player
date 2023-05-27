import React from "react";
import { connect } from 'react-redux';
import { HomePage } from '../components';
// import { changeActiveChart } from '../actions/chart';
import { fetchTracks } from '../actions/home';
import { download } from '../actions/song';

class HomePageContainer extends React.Component {
    render() {
        return (
            <HomePage {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    // const { activeChart } = state.chartState;
    const { isLoading, tracks } = state.trackState;
    const { authenticated } = state.auth;

    return {
        isLoading,
        tracks,
        authenticated,
    }
}

export default connect(mapStateToProps, { download, fetchTracks })(HomePageContainer)
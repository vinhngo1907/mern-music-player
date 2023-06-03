import React, { Component } from "react";
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';
import { fetchTracks } from '../actions/home';
// import { download } from '../actions/song';

class HomePageContainer extends Component {
    render() {
        return (
            <HomePage {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    const { activeChart } = state.chartState;
    const { isLoading, tracks } = state.trackState;
    const { authenticated } = state.auth;

    return {
        chart: state.chartState[activeChart],
        isLoading,
        tracks,
        authenticated,
        downloadProgress: state.UIState.downloadProgress,
        isFading: state.UIState.isFading,
        activeChoiceId: state.trackState.activeId
    }
}

export default connect(mapStateToProps,
    {
        changeActiveChart,
        fetchTracks,
    })(HomePageContainer);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Player } from '../components';
import * as songActions from '../actions/song';

export class PlayerContainer extends Component {
    render() {
        return (
            <Player {...this.props} />
        );
    }
}

function mapStateToProps() {

}

export default connect(mapStateToProps,
    {

    })(PlayerContainer)
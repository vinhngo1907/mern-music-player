import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { resetSlideInRight } from '../actions/ui';
import { isEmpty } from "../utils/func";

class LogInPage extends Component {
    componentDidMount() {
        if (this.props.slideInRight) {
            this.props.dispatch(resetSlideInRight());
        }

        // clear errors in the auth state from the previous authentication attempt
        if (!isEmpty(this.props.auth.errors)) {
            this.props.dispatch(clearErrors());
        }
    }
    render() {
        return <Pages.LogInPage
            dispatch={this.props.dispatch}
            auth={this.props.auth}
        />;
    }
}

function mapStateToProps({ auth, UIState }) {
    return { auth, slideInRight: UIState.slideInRight };
}

export default connect(mapStateToProps)(LogInPage);
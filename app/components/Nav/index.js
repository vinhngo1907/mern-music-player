import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";


class Nav extends React.Component {
    render() {
        const { authenticated, user } = this.props.auth;
        return (
            <nav></nav>
        )
    }
}

export default Nav;
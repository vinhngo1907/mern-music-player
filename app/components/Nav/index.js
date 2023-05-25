import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { IndexLink, Link } from "react-router";

class Nav extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.state = { term: "", searchResult: {} }
        this.debounceSearch = debounce(this.search, 600)
    }

    search(term) {
        axios.get(`api/media/search?term=${term}`).then(({ data }) => {
            if (this.state.term.length) {
                this.setState({ searchResult: data });
            }
        }).catch(err => { throw err; })
    }



    render() {
        const { authenticated, user } = this.props.auth;
        return (
            <nav>
                <div className="logo">
                    <Link to="/">BT</Link>
                </div>
            </nav>
        )
    }
}

Nav.propTypes = {
    auth: PropTypes.shape({
      authenticated: PropTypes.bool.isRequired,
      errors: PropTypes.object.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
  };
  
  export default Nav;  
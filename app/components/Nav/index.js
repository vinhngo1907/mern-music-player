import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { IndexLink, Link } from "react-router";
import "./nav.sass"

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

    handleOnChange(e){

    }

    render() {
        const { authenticated, user } = this.props.auth;
        return (
            <nav>
                <div className="logo">
                    <Link to="/">V-Music</Link>
                </div>
                <div className="searchBar">
                    <div className="search-wrapper">
                        <i className="ion-search"></i>
                        <input
                            type="text"
                            placeholder="search for songs"
                            value={this.state.term}
                            onChange={this.handleOnChange.bind(this)}
                        />
                    </div>
                    {/* {this.state.searchResult.msg === "Success" && (
                        <SearchMenu
                            searchResult={this.state.searchResult}
                            clearSearchResult={this.clearSearchResult.bind(this)}
                        />
                    )} */}
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
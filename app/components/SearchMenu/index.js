import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import './index.sass';

class SearchMenu extends Component {
    handleClickOutside = () => {
      this.props.clearSearchResult();
    }
}

SearchMenu.propTypes = {
    // searchResult: PropTypes.object.isRequired,
    // clearSearchResult: PropTypes.func.isRequired
  };
  
  export default onClickOutside(SearchMenu);
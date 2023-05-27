import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import './index.sass';

class SearchMenu extends Component {
    handleClickOutside = () => {
      this.props.clearSearchResult();
    }
}
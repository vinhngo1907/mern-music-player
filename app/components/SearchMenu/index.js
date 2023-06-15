import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import './index.sass';

class SearchMenu extends Component {
  handleClickOutside = () => {
    this.props.clearSearchResult();
  }
  render() {
    const { data } = this.props.searchResult;
    return (

      <ul className='saearch-menu'>
        <SongResult songs={data.songs || []} clearSearchResult={this.props.clearSearchResult} />
      </ul>
    )
  }
}

SearchMenu.propTypes = {
//   searchResult: PropTypes.object.isRequired,
//   clearSearchResult: PropTypes.func.isRequired
};

export default onClickOutside(SearchMenu);
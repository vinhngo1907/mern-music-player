import React from "react";
import { connect } from 'react-redux';
import { HomePage } from '../components';

class HomePageContainer extends React.Component {
    render() {
      return (
        <HomePage {...this.props} />
      );
    }
  }
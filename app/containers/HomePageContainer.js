import React from "react";
import { connect } from 'react-redux';
import { HomePage } from '../components';

class HomePageContainer extends Component {
    render() {
      return (
        <HomePage {...this.props} />
      );
    }
  }
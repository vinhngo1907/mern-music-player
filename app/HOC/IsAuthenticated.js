import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class IsAuthenticated extends React.Component {}
    
    IsAuthenticated.propTypes = {
        authenticated: PropTypes.bool.isRequired,
        user: PropTypes.object
    }
}
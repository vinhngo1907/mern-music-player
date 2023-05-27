import React from 'react';
import PropTypes from 'prop-types';
// import TextInputGroup from './TextInputGroup';
// import { slideInRight } from '../../../actions/ui';
import { signup } from '../../../actions/auth';
import './index.sass';

class SignUpPage extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}
}
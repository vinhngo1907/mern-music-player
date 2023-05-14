const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'react-dom', 'redux', 'axios', 'prop-types', 'redux-thunk',
    'react-router-redux', 'lodash.chunk', 'lodash.debounce', 'lodash.throttle',
    'react-router', 'react-onclickoutside', 'react-input-range', 'react-toastify',
    'react-circular-progressbar', 'react-addons-css-transition-group',
];

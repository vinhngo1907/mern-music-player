import PropTypes from "prop-types";
import React from "react";
import InputRange from "react-input-range";
import { browserHistory, Link } from "react-router";
import { clearRequestInterval, requestInterval } from "../../requestInterval";
import { changeAlias, formatTime, isTwoObjectEqual } from "../../utils/func";
import initAnalyzer from "../../utils/initAnalyzer";
import { extractAlias } from "../../utils/func";
import LinksByComma from "../LinksByComma";
import "./index.sass";
import PlayerLoader from "./PlayerLoader";

class Player extends React.PureComponent {}
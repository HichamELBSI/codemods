require('style.scss');

import R from 'ramda';

import cx from 'classnames';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class DecoratedClass extends Component {

    render() {
        return <div />;
    }
}

const enhance = R.pipe(stuff, connect());
export default enhance(DecoratedClass);

require('style.scss');

import cx from 'classnames';
import R from 'ramda';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class DecoratedClass extends Component {

    render() {
        return <div />;
    }
}

const enhance = R.pipe(stuff, connect());
export default enhance(DecoratedClass);

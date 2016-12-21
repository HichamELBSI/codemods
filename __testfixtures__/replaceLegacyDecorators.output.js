import R from 'ramda';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class DecoratedClass extends Component {

    static propTypes = {};

    render() {
        return <div />;
    }
}

const enhance = R.pipe(
    connect(),
);
export default enhance(DecoratedClass);

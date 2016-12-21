import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect()
export default class DecoratedClass extends Component {

    static propTypes = {};

    render() {
        return <div />;
    }
}


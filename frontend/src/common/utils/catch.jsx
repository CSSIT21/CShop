import React, { Component } from 'react'
import { isFunc, noop, noot } from './index';

export default class Catch extends Component {
    constructor(props) {
        super({...props, fallback: noot, onError: noop});
        this.state = { hasError: false, error: null, info: null };
    }

    componentDidCatch(error,info){
        this.setState({ hasError: false, error, info});
    }

    render() {
        if(this.state.hasError){
            const {error,info} = this.state;
            this.props.onError.apply(this,this);
            return <>{isFunc(this.props.fallback) ? this.props.fallback({error,info}) : this.props.fallback}</>;
        }
        return this.props.children;
    }
}

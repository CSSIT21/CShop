import React, { Component } from 'react'
import { isFunc, noop, noot } from './index';
import { assign } from '~/common/utils/';

export default class Catch extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }
    
      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
      }
    
      componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({error, errorInfo});
        console.error(error, errorInfo);
      }
    
      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <>{isFunc(this.props.fallback) ? this.props.fallback(this) : this.props.fallback }</>;
        }
    
        return this.props.children; 
      }
}

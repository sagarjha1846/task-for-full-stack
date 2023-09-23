import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true, errorMessage: error.toString() });
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    }
    return this.props.children;
  }
}

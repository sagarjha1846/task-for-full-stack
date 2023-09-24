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
      return (
        <div className="w-screen h-screen flex justify-center items-center content-center">
          {this.state.errorMessage}
        </div>
      );
    }
    return this.props.children;
  }
}

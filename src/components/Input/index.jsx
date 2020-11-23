import React, { Component, createRef } from 'react';

import './style.scss';

class Input extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.rest = props;
  }

  render() {
    return <input ref={this.ref} {...this.rest} />;
  }
}

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import Typist from 'react-typist';

const Text = ({ children, ...props }) => {
  const { parse, animated } = props;
  const text = parse ? Parser(children) : children;

  return (
    (animated && (
      <Typist cursor={{ hideWhenDone: true }} avgTypingDelay={30}>
        {text}
      </Typist>
    )) || <span>{text}</span>
  );
};

Text.propTypes = {
  parse: PropTypes.bool,
  animated: PropTypes.bool,
};

Text.defaultProps = {
  parse: true,
  animated: false,
};

export default Text;

import React from 'react';

import './style.scss';

const Button = ({ children, ...props }) => {
  const clickAction = props.onClick;
  const type = props.type ?? 'button';
  const color = props.blue === true ? 'btn btn-blue' : 'btn';
  const { disabled } = props;
  const classBtn = props.noSized === true ? `${color} no-sized` : color;

  return (
    <button
      type={type}
      onClick={clickAction}
      className={classBtn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

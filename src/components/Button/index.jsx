import React from 'react';

import './style.scss';

const Button = ({ children, ...props }) => {
  const clickAction = props.onClick;
  const type = props.type ?? 'button';
  return (
    <button type={type} onClick={clickAction} className="btn">
      {children}
    </button>
  );
};

export default Button;

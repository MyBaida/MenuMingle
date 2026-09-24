import React from 'react';

// Variant maps to the component classes defined in css/index.css (@layer components).
const variantClass = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

const Button = ({ onClick, children, variant = 'primary', type = 'button', disabled, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass[variant] || variantClass.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

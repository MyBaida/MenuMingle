import React from 'react';
import styles from '../css/Button.css';

const Button = ({ onClick, children }) => {
    return (
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    );
  };

export default Button;
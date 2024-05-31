// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../stylesheet/button.css'; // スタイルシートをインポート

const Button = ({ text, onClick, disabled, styleType, to }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button 
      className={`btn ${styleType}`} 
      onClick={handleClick} 
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  styleType: PropTypes.string,
  to: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  styleType: 'default',
  to: null,
};

export default Button;

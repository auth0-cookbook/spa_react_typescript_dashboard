import React from "react";

import "./button.scss";

type IButtonProps = {
  size?: string;
  action: () => void;
  label: string;
};

const Button: React.FC<IButtonProps> = ({ action, label, size = "small" }) => (
  <div className={`button button--${size} effect__grow`} onClick={action}>
    {label}
  </div>
);

export default Button;

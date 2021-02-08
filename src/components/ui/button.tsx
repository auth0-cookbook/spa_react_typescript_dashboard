import React from "react";

import "./button.scss";

interface IButtonProps {
  variant: "text" | "solid" | "outline";
  label: string;
  action: () => void;
  customClass?: string;
  enabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  variant,
  label,
  action,
  customClass,
  enabled,
}) => {
  let className = `button ${variant}-button`;

  if (customClass !== undefined) {
    className += ` ${customClass}`;
  }

  if (enabled !== undefined && !enabled) {
    className += ` ${variant}-button--disabled`;
  }

  return (
    <button onClick={action} className={className}>
      {label}
    </button>
  );
};

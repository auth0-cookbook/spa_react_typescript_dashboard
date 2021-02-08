import React from "react";

import "./outline-button.scss";

interface IOutlineButtonProps {
  label: string;
  action: () => void;
  customClass?: string;
  enabled?: boolean;
}

export const OutlineButton: React.FC<IOutlineButtonProps> = ({
  label,
  action,
  customClass,
  enabled
}) => {
  let className = customClass
    ? `button outline-button ${customClass}`
    : "button outline-button";

  if (enabled !== undefined && !enabled) {
    className += " outline-button--disabled";
  }

  return (
    <button onClick={action} className={className}>
      {label}
    </button>
  );
};

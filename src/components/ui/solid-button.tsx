import React from "react";

import "./solid-button.scss";

interface ISolidButtonProps {
  label: string;
  action: () => void;
  customClass?: string;
  enabled?: boolean;
}

export const SolidButton: React.FC<ISolidButtonProps> = ({
  label,
  action,
  customClass
}) => {
  let className = customClass
    ? `button solid-button ${customClass}`
    : "button solid-button";

  return (
    <button onClick={action} className={className}>
      {label}
    </button>
  );
};

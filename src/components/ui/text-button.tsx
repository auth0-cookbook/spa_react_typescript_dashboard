import React from "react";

import "./text-button.scss";

interface ITextButtonProps {
  label: string;
  action: () => void;
  customClass?: string;
  enabled?: boolean;
}

export const TextButton: React.FC<ITextButtonProps> = ({
  label,
  action,
  customClass
}) => {
  const className = customClass
    ? `button text-button ${customClass}`
    : "button text-button";

  return (
    <button onClick={action} className={className}>
      {label}
    </button>
  );
};

import React from "react";

import "./pill-button.scss";

interface IFormButtonProps {
  enabled?: boolean;
  action: () => void;
  label: string;
}

export const PillButton: React.FC<IFormButtonProps> = (
  props: IFormButtonProps
) => (
  <button
    className={`pill-button ${
      props.enabled === undefined
        ? `effect__bg-fade`
        : props.enabled
        ? `effect__bg-fade`
        : `pill-button--disabled`
    }`}
    onClick={props.action}
    disabled={props.enabled === undefined ? false : !props.enabled}
  >
    {props.label}
  </button>
);

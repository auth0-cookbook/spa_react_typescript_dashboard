import React from "react";

import "./form-button.scss";

interface IFormButtonProps {
  enabled?: boolean;
  action: () => void;
  label: string;
}

export const FormButton: React.FC<IFormButtonProps> = (
  props: IFormButtonProps
) => (
  <button
    className={`form-button ${
      props.enabled === undefined
        ? `effect__bg-fade`
        : props.enabled
        ? `effect__bg-fade`
        : `form-button--disabled`
    }`}
    onClick={props.action}
    disabled={props.enabled === undefined ? false : !props.enabled}
  >
    {props.label}
  </button>
);

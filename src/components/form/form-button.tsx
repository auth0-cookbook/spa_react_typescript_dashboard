import React from "react";

import "./form-button.scss";

interface IFormButtonProps {
  enabled?: boolean;
  action: () => void;
  label: string;
}

const FormButton: React.FC<IFormButtonProps> = (props: IFormButtonProps) => (
  <button
    className={`Form__button ${
      props.enabled === undefined
        ? `Effect__bgFade`
        : props.enabled
        ? `Effect__bgFade`
        : `Form__button--disabled`
    }`}
    onClick={props.action}
    disabled={props.enabled === undefined ? false : !props.enabled}
  >
    {props.label}
  </button>
);

export default FormButton;

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import "./error-box.scss";

interface IErrorBoxProps {
  message: string;
  visible: boolean;
  action: () => void;
}

const ErrorBox: React.FC<IErrorBoxProps> = props => {
  const { visible, message, action } = props;

  if (visible) {
    return (
      <div className="error-box__container">
        {message}
        <FontAwesomeIcon
          className="error-box__icon"
          icon={faTimes}
          size="lg"
          onClick={action}
        />
      </div>
    );
  }

  return null;
};

export default ErrorBox;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

import "./loader.scss";

export const Loader: React.FC = () => (
  <div className="loader">
    <FontAwesomeIcon icon={faSpinner} spin />
  </div>
);

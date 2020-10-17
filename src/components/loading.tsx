import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons/faStroopwafel";

import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <FontAwesomeIcon icon={faStroopwafel} spin />
    </div>
  );
};

export default Loading;

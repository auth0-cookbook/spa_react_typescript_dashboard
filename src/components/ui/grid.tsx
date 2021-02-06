import React from "react";

import "./grid.scss";

export const Grid: React.FC = React.memo((props) => (
  <div className="grid">{props.children}</div>
));

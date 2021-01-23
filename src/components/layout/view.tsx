import React from "react";

import "./view.scss";
import { Content } from "./content";

export enum ViewStates {
  Valid = "valid",
  NotFound = "not_found",
}

interface IViewProps {
  viewStatus?: ViewStates.Valid | ViewStates.NotFound;
}

export const View: React.FC<IViewProps> = ({ viewStatus, children }) => {
  const status: string = viewStatus || ViewStates.Valid;

  return (
    <main className="view">
      {status === ViewStates.Valid && children}

      {status === ViewStates.NotFound && (
        <Content title="Page Not Found">
          <h3>Unable to dish out content.</h3>
          <img
            className="not-found--image"
            src="https://cdn.auth0.com/blog/whatabyte/broken-plate-sm.png"
            alt="Broken plates, broken page"
          />
          {children}
        </Content>
      )}
    </main>
  );
};

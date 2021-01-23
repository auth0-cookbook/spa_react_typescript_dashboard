import React from "react";

import "./view.scss";
import { Content } from "./content";

export enum ViewStates {
  Valid = "valid",
  NotFound = "not_found",
}

interface IViewProps {
  viewStatus?: ViewStates.Valid | ViewStates.NotFound;
  children?: React.ReactNode;
}

export const View: React.FC<IViewProps> = (props) => {
  const viewStatus: string = props.viewStatus || ViewStates.Valid;

  if (viewStatus === ViewStates.Valid) {
    return <main id="view">{props.children}</main>;
  }

  if (viewStatus === ViewStates.NotFound) {
    return (
      <main id="view">
        <Content title="Page Not Found">
          <h3>Unable to dish out content.</h3>
          <img
            className="view__not-found--image"
            src="https://cdn.auth0.com/blog/whatabyte/broken-plate-sm.png"
            alt="Broken plates, broken page"
          />
          {props.children}
        </Content>
      </main>
    );
  }

  return null;
};

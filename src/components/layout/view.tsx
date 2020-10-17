import React from "react";

import "./view.scss";
import Content from "./content";

export enum ViewStates {
  Valid = "valid",
  NotFound = "not_found"
}

interface IViewProps {
  viewStatus?: ViewStates.Valid | ViewStates.NotFound;
  children?: React.ReactNode;
}

class View extends React.Component<IViewProps> {
  render() {
    const viewStatus: string = this.props.viewStatus || ViewStates.Valid;

    return (
      <main id="View">
        {viewStatus === ViewStates.Valid && this.props.children}

        {viewStatus === ViewStates.NotFound && (
          <Content title="Page Not Found">
            <h3>Unable to dish out content.</h3>
            <img
              className="View__notFound--image"
              src="https://cdn.auth0.com/blog/whatabyte/broken-plate-sm.png"
              alt="Broken plates, broken page"
            />
            {this.props.children}
          </Content>
        )}
      </main>
    );
  }
}

export default View;

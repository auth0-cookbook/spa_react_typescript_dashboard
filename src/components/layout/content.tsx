import React from "react";

import "./content.scss";

interface ContentProps {
  title: string;
  actionName?: string;
  action?: () => void;
  children?: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({
  title,
  action,
  actionName,
  children,
}) => {
  return (
    <section className="content">
      <div className="content__header">
        <div className="content__header-title">{title}</div>
        {actionName && action && (
          <div
            className="content__header-action effect__link-fade-opacity"
            onClick={action}
          >
            {actionName}
          </div>
        )}
      </div>
      <div className="content__body">{children}</div>
    </section>
  );
};

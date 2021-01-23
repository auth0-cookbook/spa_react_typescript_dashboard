import React from "react";

import "./content.scss";

interface IContentHeaderTitleProps {
  title: string;
}

interface IContentHeaderActionProps {
  actionName: string;
  action: () => void;
}

interface IContentHeaderProps {
  title: string;
  actionName?: string;
  action?: () => void;
}

interface IContentProps {
  title: string;
  actionName?: string;
  action?: () => void;
  children?: React.ReactNode;
}

const ContentHeaderTitle: React.FC<IContentHeaderTitleProps> = (
  props: IContentHeaderTitleProps
) => <div className="content__header-title">{props.title}</div>;

const ContentHeaderAction: React.FC<IContentHeaderActionProps> = (
  props: IContentHeaderActionProps
) => (
  <div
    className="content__header-action effect__link-fade-opacity"
    onClick={props.action}
  >
    {props.actionName}
  </div>
);

const ContentHeader: React.FC<IContentHeaderProps> = (
  props: IContentHeaderProps
) => (
  <div className="content__header">
    <ContentHeaderTitle title={props.title} />
    {props.actionName && props.action && (
      <ContentHeaderAction
        actionName={props.actionName}
        action={props.action}
      />
    )}
  </div>
);

const ContentBody: React.FC = (props) => (
  <div className="content__body">{props.children}</div>
);

export const Content: React.FC<IContentProps> = (props: IContentProps) => {
  return (
    <section className="content">
      <ContentHeader
        title={props.title}
        actionName={props.actionName}
        action={props.action}
      />
      <ContentBody>{props.children}</ContentBody>
    </section>
  );
};

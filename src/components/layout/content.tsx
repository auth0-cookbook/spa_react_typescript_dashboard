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
) => <div className="Content__header-title">{props.title}</div>;

const ContentHeaderAction: React.FC<IContentHeaderActionProps> = (
  props: IContentHeaderActionProps
) => (
  <div
    className="Content__header-action Effect__linkFadeOpacity"
    onClick={props.action}
  >
    {props.actionName}
  </div>
);

const ContentHeader: React.FC<IContentHeaderProps> = (
  props: IContentHeaderProps
) => (
  <div className="Content__header">
    <ContentHeaderTitle title={props.title} />
    {props.actionName && props.action && (
      <ContentHeaderAction
        actionName={props.actionName}
        action={props.action}
      />
    )}
  </div>
);

const ContentBody: React.FC = props => (
  <div className="Content__body">{props.children}</div>
);

const Content: React.FC<IContentProps> = (props: IContentProps) => {
  return (
    <section className="Content">
      <ContentHeader
        title={props.title}
        actionName={props.actionName}
        action={props.action}
      />
      <ContentBody>{props.children}</ContentBody>
    </section>
  );
};

export default Content;

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
) => <div className="content__title">{props.title}</div>;

const ContentHeaderAction: React.FC<IContentHeaderActionProps> = (
  props: IContentHeaderActionProps
) => (
  <div
    className="content__action effect__link-fade--opacity"
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

const Content: React.FC<IContentProps> = ({
  title,
  actionName,
  action,
  children,
}) => {
  return (
    <section className="content">
      <ContentHeader title={title} actionName={actionName} action={action} />
      <ContentBody>{children}</ContentBody>
    </section>
  );
};

export default Content;

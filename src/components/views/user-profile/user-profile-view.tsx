import React from "react";

import { useAuth0, WithAuth0Props } from "@auth0/auth0-react";

import { View } from "../../layout/view";
import { Content } from "../../layout/content";
import { OutlineButton } from "../../ui/outline-button";
import { TextButton } from "../../ui/text-button";

import "./user-profile-view.scss";

interface IAvatarProps {
  picture: string;
  firstName: string;
}

const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  return (
    <img
      className="user-profile__avatar"
      src={props.picture}
      alt={props.firstName}
    />
  );
};

export const UserProfileView: React.FC<WithAuth0Props> = () => {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <View>
      <Content title={user.name}>
        <Avatar picture={user.picture} firstName={user.name} />
        <div className="user-profile__actions">
          <OutlineButton label="View Account" action={() => {}} />
          <TextButton label="Help" action={() => {}} />
        </div>
      </Content>
    </View>
  );
};

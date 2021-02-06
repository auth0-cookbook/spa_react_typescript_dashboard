import React from "react";

import { Content } from "../../layout/content";
import { Button } from "../../ui/button";
import { View } from "../../layout/view";

import { useAuth0 } from "@auth0/auth0-react";

import "./user-profile-view.scss";

interface IAvatarProps {
  picture: string;
  firstName: string;
}

const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  return (
    <img
      className="profile__avatar"
      src={props.picture}
      alt={props.firstName}
    />
  );
};

export const UserProfileView = () => {
  const { user } = useAuth0();

  return (
    user && (
      <View>
        <Content title={user.name}>
          <Avatar picture={user.picture} firstName={user.name} />
          <Button label="View Account" action={() => {}} />
          <Button label="Help" action={() => {}} />
        </Content>
      </View>
    )
  );
};

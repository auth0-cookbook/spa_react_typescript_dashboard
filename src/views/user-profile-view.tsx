import React from "react";

import { useAuth0, WithAuth0Props } from "@auth0/auth0-react";

import { View } from "../components/layout/view";
import { Content } from "../components/layout/content";

import "./user-profile-view.scss";
import { Button } from "../components/ui/button";

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
          <Button variant="outline" label="View Account" action={() => {}} />
          <Button variant="text" label="Help" action={() => {}} />
        </div>
      </Content>
    </View>
  );
};

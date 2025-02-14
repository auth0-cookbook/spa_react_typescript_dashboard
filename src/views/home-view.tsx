import React from "react";

import { Content } from "../components/layout/content";
import { View } from "../components/layout/view";

import { useAuth0 } from "@auth0/auth0-react";

export const HomeView: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <View>
      {isAuthenticated ? (
        <Content title={`Hello, ${user.name}`} />
      ) : (
        <Content title="Howdy">
          <h3>To start using the Dashboard, please sign in.</h3>
        </Content>
      )}
    </View>
  );
};

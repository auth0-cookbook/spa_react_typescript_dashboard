import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface Auth0User {
  name: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  emailVerified: boolean;
  picture: string;
  locale: string;
}

export const useAuth0User = () => {
  const { user } = useAuth0();
  const [auth0User, setAuth0User] = useState<Auth0User | undefined>(undefined);

  useEffect(() => {
    const {
      email,
      email_verified: emailVerified,
      family_name: lastName,
      given_name: firstName,
      locale,
      name,
      nickname,
      picture,
    } = user;

    setAuth0User({
      email,
      emailVerified,
      lastName,
      firstName,
      locale,
      name,
      nickname,
      picture,
    });
  }, [user]);

  return { auth0User };
};

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  isMenuAdmin: boolean;
  picture: string;
}

export interface Auth0UserInfo {
  email: string;
  email_verified: string;
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export interface Auth0UserInfoWithRoles extends Auth0UserInfo {
  [key: string]: string | string[];
}

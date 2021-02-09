import React from "react";
import { NavLink } from "react-router-dom";

import { Logo } from "../ui/logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useAuth0 } from "@auth0/auth0-react";

import "./nav-bar.scss";
import { Button } from "../ui/button";

interface INavBarMenuLinkProps {
  to: string;
  icon: IconProp;
  label: string;
}

const NavBarMenuLink: React.FC<INavBarMenuLinkProps> = (props) => {
  return (
    <NavLink
      className="nav-bar__menu-link-wrapper effect__link-fade"
      to={props.to}
      activeClassName="nav-bar__menu-link--active"
    >
      <div className="nav-bar__menu-link">
        <div className="nav-bar__menu-link-icon">
          <FontAwesomeIcon icon={props.icon} size="lg" />
        </div>
        <span className="nav-bar__menu-link-label">{props.label}</span>
      </div>
    </NavLink>
  );
};

const NavBarSessionInfo: React.FC = (props) => (
  <div className="nav-bar__user-info">
    <NavLink
      className="nav-bar__user-info-link"
      to="/profile"
      activeClassName="nav-bar__user-info-link--active"
    >
      <div className="nav-bar__user-info-avatar">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>
      <span className="nav-bar__user-info-name">{props.children}</span>
    </NavLink>
  </div>
);

export const NavBar: React.FC = () => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();

  return (
    <nav id="nav-bar" role="navigation" aria-label="NavBar">
      <div className="nav-bar__header">
        <Logo />
      </div>
      <div className="nav-bar__menu">
        <div className="nav-bar__menu-Item">
          <NavBarMenuLink to="/home" label="Home" icon={faHome} />
        </div>
        <div className="nav-bar__menu-Item">
          <NavBarMenuLink to="/menu" label="Menu" icon={faUtensils} />
        </div>
      </div>
      {isAuthenticated && (
        <div className="nav-bar__footer">
          <Button
            variant="solid"
            customClass="authentication-button"
            label="Log Out"
            action={() => logout()}
          />
          <NavBarSessionInfo>
            {user.name || `Auth0 Eats Teammate`}
          </NavBarSessionInfo>
        </div>
      )}
      {!isAuthenticated && (
        <div className="nav-bar__footer">
          <Button
            variant="solid"
            customClass="authentication-button"
            label="Log In"
            action={async () => await loginWithRedirect()}
          />
        </div>
      )}
    </nav>
  );
};

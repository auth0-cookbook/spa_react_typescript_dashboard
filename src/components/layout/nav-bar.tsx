import React from "react";
import { NavLink } from "react-router-dom";

import { PillButton } from "../ui/pill-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./nav-bar.scss";
import { useAuth0 } from "@auth0/auth0-react";

interface INavBarMenuLinkProps {
  to: string;
  icon: IconProp;
  label: string;
}

interface INavBarProps {
  appName: string;
}

const NavBarHeader: React.FC = (props) => (
  <div className="nav-bar__header">{props.children}</div>
);

const NavBarMenu: React.FC = (props) => (
  <div className="nav-bar__menu">{props.children}</div>
);

const NavBarMenuItem: React.FC = (props) => (
  <div className="nav-bar__menu-Item">{props.children}</div>
);

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

const NavBarList: React.FC = (props) => (
  <div className="nav-bar__list">{props.children}</div>
);

const NavBarFooter: React.FC = (props) => (
  <div className="nav-bar__footer">{props.children}</div>
);

const NavBarSessionInfo: React.FC = (props) => (
  <div className="nav-bar__user-info">
    <NavLink
      className="nav-bar__user-info-link"
      to="/user-profile"
      activeClassName="nav-bar__user-info-link--active"
    >
      <div className="nav-bar__user-info-avatar">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>
      <span className="nav-bar__user-info-name">{props.children}</span>
    </NavLink>
  </div>
);

export const NavBar: React.FC<INavBarProps> = (props) => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();

  return (
    <nav id="nav-bar" role="navigation" aria-label="NavBar">
      <NavBarHeader>{props.appName}</NavBarHeader>
      <NavBarMenu>
        <NavBarMenuItem>
          <NavBarMenuLink to="/home" label="Home" icon={faHome} />
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuLink to="/menu" label="Menu" icon={faUtensils} />
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuLink to="/settings" label="Settings" icon={faCog} />
        </NavBarMenuItem>
      </NavBarMenu>
      <NavBarList />
      {isAuthenticated && (
        <NavBarFooter>
          <PillButton
            label="Sign Out"
            action={() =>
              logout({
                returnTo: "TODO",
              })
            }
          />
          <NavBarSessionInfo>{user.name || `WAB Teammate`}</NavBarSessionInfo>
        </NavBarFooter>
      )}
      {!isAuthenticated && (
        <NavBarFooter>
          <PillButton
            label="Sign In"
            action={async () => await loginWithRedirect()}
          />
        </NavBarFooter>
      )}
    </nav>
  );
};

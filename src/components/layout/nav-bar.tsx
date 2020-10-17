import React from "react";
import { NavLink } from "react-router-dom";

import FormButton from "../form/form-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./nav-bar.scss";
import { useAuth0 } from "@auth0/auth0-react";

interface INavBarMenuLinkProps {
  to: string;
  icon: IconProp;
  label: string;
}

const NavBarHeader: React.FC = (props) => (
  <div className="NavBar__header">{props.children}</div>
);

const NavBarMenu: React.FC = (props) => (
  <div className="NavBar__menu">{props.children}</div>
);

const NavBarMenuItem: React.FC = (props) => (
  <div className="NavBar__menuItem">{props.children}</div>
);

const NavBarMenuLink: React.FC<INavBarMenuLinkProps> = (props) => {
  return (
    <NavLink
      className="NavBar__menuLink-wrapper Effect__linkFade"
      to={props.to}
      activeClassName="NavBar__menuLink--active"
    >
      <div className="NavBar__menuLink">
        <div className="NavBar__menuLink-icon">
          <FontAwesomeIcon icon={props.icon} size="lg" />
        </div>
        <span className="NavBar__menuLink-label">{props.label}</span>
      </div>
    </NavLink>
  );
};

const NavBarList: React.FC = (props) => (
  <div className="NavBar__list">{props.children}</div>
);

const NavBarFooter: React.FC = (props) => (
  <div className="NavBar__footer">{props.children}</div>
);

const NavBarSessionInfo: React.FC = (props) => (
  <div className="NavBar__userInfo">
    <NavLink
      className="NavBar__userInfo-link"
      to="/profile"
      activeClassName="NavBar__userInfo-link--active"
    >
      <div className="NavBar__userInfo-avatar">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>
      <span className="NavBar__userInfo-name">{props.children}</span>
    </NavLink>
  </div>
);

const NavBar: React.FC = () => {
  const appName = "WHATABYTE";

  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();

  console.log(user);

  return (
    <nav id="NavBar" role="navigation" aria-label="NavBar">
      <NavBarHeader>{appName}</NavBarHeader>
      <NavBarMenu>
        <NavBarMenuItem>
          <NavBarMenuLink to="/home" label="Home" icon={faHome} />
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuLink to="/menu" label="Menu" icon={faUtensils} />
        </NavBarMenuItem>
      </NavBarMenu>
      <NavBarList />
      <NavBarFooter>
        {isAuthenticated ? (
          <>
            <FormButton
              label="Sign Out"
              action={() => logout({ returnTo: window.location.origin })}
            />
            <NavBarSessionInfo>{user.name || `WAB Teammate`}</NavBarSessionInfo>
          </>
        ) : (
          <FormButton label="Sign In" action={loginWithPopup} />
        )}
      </NavBarFooter>
    </nav>
  );
};

export default NavBar;

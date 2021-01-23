import React from "react";
import { NavLink } from "react-router-dom";

import { FormButton } from "../form/form-button";
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
  <div className="nav-bar__header">{props.children}</div>
);

const NavBarTabs: React.FC = (props) => (
  <div className="nav-bar__tabs">{props.children}</div>
);

const NavBarTab: React.FC = (props) => (
  <div className="nav-bar__tab">{props.children}</div>
);

const NavBarTabLink: React.FC<INavBarMenuLinkProps> = (props) => {
  return (
    <NavLink
      className="tab-link__wrapper effect__link-fade"
      to={props.to}
      activeClassName="tab-link--active"
    >
      <div className="tab-link">
        <div className="tab-link__icon">
          <FontAwesomeIcon icon={props.icon} size="lg" />
        </div>
        <span className="tab-link__label">{props.label}</span>
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
      className="user-tab"
      to="/profile"
      activeClassName="user-tab--active"
    >
      <div className="user-tab__avatar">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>
      <span className="user-tab__name">{props.children}</span>
    </NavLink>
  </div>
);

export const NavBar: React.FC = () => {
  const appName = "WHATABYTE";

  const {
    isAuthenticated,
    logout,
    loginWithPopup,
    user,
    isLoading,
  } = useAuth0();

  return (
    <nav className="nav-bar" role="navigation" aria-label="nav-bar">
      <NavBarHeader>{appName}</NavBarHeader>
      <NavBarTabs>
        <NavBarTab>
          <NavBarTabLink to="/home" label="Home" icon={faHome} />
        </NavBarTab>
        <NavBarTab>
          <NavBarTabLink to="/menu" label="Menu" icon={faUtensils} />
        </NavBarTab>
      </NavBarTabs>
      <NavBarList />
      {!isLoading && (
        <NavBarFooter>
          {isAuthenticated ? (
            <>
              <FormButton
                label="Sign Out"
                action={() => logout({ returnTo: window.location.origin })}
              />
              <NavBarSessionInfo>
                {user.name || `WAB Teammate`}
              </NavBarSessionInfo>
            </>
          ) : (
            <FormButton label="Sign In" action={loginWithPopup} />
          )}
        </NavBarFooter>
      )}
    </nav>
  );
};

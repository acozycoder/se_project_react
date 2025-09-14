import "./Header.css";
import Logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";
import { useState, useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClothes,
  weatherData,
  handleRegister,
  handleLogin,
  isLoggedIn,
  currentUser,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={Logo} alt="wtwr logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      {!isMobileMenuOpened ? (
        <button className="header__menu-button" onClick={toggleMobileMenu} />
      ) : (
        <button className="header__close-button" onClick={toggleMobileMenu} />
      )}
      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_open" : ""
        }`}
      >
        <NavLink to="/profile" className="header__profile-link">
          <div className="header__nav-user-info">
            <p className="header__username">Terrance Tegegne</p>
            <img
              className="header__avatar"
              src={avatar}
              alt="Terrance Tegegne"
            />
          </div>
        </NavLink>
      </div>

      <ToggleSwitch className="header__switch" />

      {isLoggedIn ? (
        <div className="header__user-container">
          <button
            onClick={handleAddClothes}
            type="button"
            className="header__add-clothes"
          >
            {" "}
            + Add clothes
          </button>

          <NavLink to="/profile" className="header__profile-link">
            <div className="header__user-info">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="header__auth-container">
          <button
            onClick={handleRegister}
            type="button"
            className="header__auth-button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            type="button"
            className="header__auth-button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

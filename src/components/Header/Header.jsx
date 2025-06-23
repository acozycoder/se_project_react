import "./Header.css";
import Logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";
import { useState } from "react";
import Switch from "../Switch/Switch";
import { NavLink } from "react-router-dom";


function Header({ handleAddClothes, weatherData }) {
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
          <img className="header__avatar" src={avatar} alt="Terrance Tegegne" />
        </div>
        </NavLink>

        <button
          onClick={handleAddClothes}
          type="button"
          className="header__nav-add-clothes"
        >
          {" "}
          + Add clothes
        </button>
      </div>

      <Switch />
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
        <p className="header__username">Terrance Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrance Tegegne" />
      </div>
      </NavLink>
    </header>
  );
}

export default Header;

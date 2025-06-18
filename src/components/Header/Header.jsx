import "./Header.css";
import Logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import { currentDate } from "../../utils/constants";

function Header({ handleAddClothes, weatherData }) {
    return (
        <header className="header">
             <img className="header__logo" src={Logo} alt="wtwr logo"/>
             <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
             <button onClick={handleAddClothes} type="button" className="header__add-clothes" > + Add clothes</button>  
            
            <div className="header__user-info">
              <p className="header__username">Terrance Tegegne</p>
              <img className="header__avatar" src={avatar} alt="Terrance Tegegne"/>  
            </div>
        </header>
    )
}

export default Header;
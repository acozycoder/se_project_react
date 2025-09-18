import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        className="switch__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="switch__button"></span>
      <span className="switch__text switch__text_F">F</span>
      <span className="switch__text switch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;

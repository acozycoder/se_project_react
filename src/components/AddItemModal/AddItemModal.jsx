import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({ onClose, onAddItemModalSubmit }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const validateImageUrl = (url) => {
    if (!url.trim()) {
      return "Image url is required";
    }
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return "Please enter a valid URL";
    }
    return "";
  };

  const validateWeather = (weather) => {
    if (!weather) {
      return "Please select a weather type";
    }
    return "";
  };

  const checkFormValidity = () => {
    const nameError = validateName(name);
    const imageError = validateImageUrl(imageUrl);
    const weatherError = validateWeather(weather);

    const newErrors = {
      name: nameError,
      imageUrl: imageError,
      weather: weatherError,
    };

    setErrors(newErrors);

    const formIsValid = !nameError && !imageError && !weatherError;
    setIsValid(formIsValid);

    return formIsValid;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    const nameError = validateName(value);
    setErrors((prev) => ({
      ...prev,
      name: nameError,
    }));

    checkFormValidity();
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);

    const imageUrlError = validateImageUrl(value);
    setErrors((prev) => ({
      ...prev,
      imageUrl: imageUrlError,
    }));

    checkFormValidity();
  };

  const handleWeatherChange = (e) => {
    const value = e.target.value;
    setWeather(value);

    const weatherError = validateWeather(value);
    setErrors((prev) => ({
      ...prev,
      weather: weatherError,
    }));

    checkFormValidity();
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formIsValid = checkFormValidity();

    if (!formIsValid) {
      console.log("Form has errors, cannot submit");
      return;
    }

    onAddItemModalSubmit({
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      weather,
    });
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="clothing-item" className="modal__label">
        Name
        <input
          id="clothing-item"
          type="text"
          placeholder="Name"
          className="modal__input"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <span className="modal__error" id="modal-name-error">
        {errors.name}
      </span>

      <label htmlFor="clothing-url" className="modal__label">
        Image
        <input
          id="clothing-url"
          type="url"
          placeholder="Image URL"
          className="modal__input"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
        />
      </label>
      <span className="modal__error" id="modal-url-error">
        {errors.imageUrl}
      </span>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <div className="modal__radio-buttons">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>
        </div>

        <div className="modal__radio-buttons">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>

        <div className="modal__radio-buttons">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
        <span className="modal__error" id="modal-weather-error">
          {errors.weather}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

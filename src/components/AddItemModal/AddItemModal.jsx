import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose, onAddItemModalSubmit }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  }

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItemModalSubmit({name, imageUrl, weather});
  }

  return (
            <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={handleSubmit}
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
          <span className="modal__error" id="modal-name-error"></span>

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
          <span className="modal__error" id="modal-url-error"></span>

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
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
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
          </fieldset>
        </ModalWithForm>
  );
};

export default AddItemModal;
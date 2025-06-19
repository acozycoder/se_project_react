import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getTemperature } from "../../utils/weatherApi";
import { APIKey } from "../../utils/constants";
import { coordinates } from "../../utils/constants";
import { processWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClothes = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getTemperature(coordinates, APIKey)
      .then((data) => {
        const processData = processWeatherData(data);
        setWeatherData(processData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClothes={handleAddClothes} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleAddClothes={setActiveModal}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="modal-name" className="modal__label">
          Name
          <input
            id="modal-name"
            type="text"
            placeholder="Name"
            className="modal__input"
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <span className="modal__error" id="modal-name-error"></span>

        <label htmlFor="modal-url" className="modal__label">
          Image
          <input
            id="modal-url"
            type="url"
            placeholder="Image URL"
            className="modal__input"
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
            />
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;

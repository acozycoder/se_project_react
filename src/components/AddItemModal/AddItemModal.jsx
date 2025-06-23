import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // declare state for each input field

  // use a useEffect hook to reset the input field state to empty strings when 
  // the modal is opened

  // create onChange handlers corresponding to each state variable

  function handleSubmit(e) {
    // prevent default behavior
    // call onAddItem with appropriate arguments
  }

  return (
            <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          onClose={onClose}
          isOpen={isOpen}
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
  );
};

export default AddItemModal;
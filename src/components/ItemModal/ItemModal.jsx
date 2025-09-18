import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser.currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={` modal ${activeModal === "preview" && "modal_open"} `}>
      <div className="modal__container item-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button item-modal__white-close-button"
        />

        <img
          className="item-modal__image"
          src={card.imageUrl}
          alt={card.name}
        />

        <div className="item-modal__caption-button">
          <h2 className="item-modal__caption">{card.name}</h2>
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={openConfirmationModal}
          >
            Delete item
          </button>
        </div>

        <p className="item-modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;

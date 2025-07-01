import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, openConfirmationModal }) {
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
            className="item-modal__button"
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

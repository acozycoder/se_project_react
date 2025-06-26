import "./DeleteModal.css";

function DeleteModal({ activeModal, onClose, onDelete}) {
  return (
    <div className={` modal ${activeModal === "delete" && "modal_open"} `}>
      <div className="modal__container delete-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button item-modal__white-close-button"
        />

        <div className="delete-modal__warning">
          <h2 className="delete-modal__warning-message">Are you sure you want to delete this item?</h2>
          <h2 className="delete-modal__warning-message">This action is irreversible.</h2>
        </div>

        <button className="delete-modal__delete-button" type="button" onClick={onDelete}>Yes, delete item</button>
        <button className="delete-modal__cancel-button" type="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteModal;
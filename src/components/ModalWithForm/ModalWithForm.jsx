import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <div className="modal modal_open">
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
        ></button>
        <p className="modal__title">{title}</p>
        <form
          name="clothes-form"
          className="modal__form"
          id="clothes-form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={
              !isValid
                ? "modal__submit-button_disabled"
                : "modal__submit-button"
            }
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

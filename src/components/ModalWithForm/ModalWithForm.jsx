import "./ModalWithForm.css";

function ModalWithForm({
  children,
  submitButtonText,
  switchButtonText,
  title,
  onClose,
  onSubmit,
  isValid,
  onSwitch,
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
          <div>
            <button
              type="submit"
              className={
                !isValid
                  ? "modal__submit-button_disabled"
                  : "modal__submit-button"
              }
            >
              {submitButtonText}
            </button>
            <button
              type="button"
              className="modal__switch-button"
              onClick={onSwitch}
            >
              {switchButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

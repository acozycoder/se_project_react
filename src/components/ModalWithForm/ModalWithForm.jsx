import "./ModalWithForm.css";

function ModalWithForm({children, buttonText, title, activeModal, onClose}) {
    return <>
        <div className={ ` modal ${activeModal === "Add garment" && "modal_open"} `}>
                <div className="modal__container">
                    <button onClick={onClose} type="button" className="modal__close-button"></button>
                    <p className="modal__title">{title}</p>
                    <form name="clothes-form" className="modal__form" id="clothes-form" noValidate>
                        {children}
                        <button type="submit" className="modal__submit-button">{buttonText}</button>
                    </form>
                </div>
            </div>
    </>
}

export default ModalWithForm;
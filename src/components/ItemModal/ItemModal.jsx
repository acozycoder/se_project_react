import "./ItemModal.css";

function ItemModal({activeModal, onClose, card}) {
    return (
        <div className={ ` modal ${activeModal === "preview" && "modal_open"} ` }>
            <div className="modal__container modal__content_type_image">
                <button onClick={onClose} type="button" className="modal__close-button modal__white-close-button"></button>
                <img className="modal__image" src={card.link} alt={card.name}/>
                <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather">Weather: {card.weather}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemModal;
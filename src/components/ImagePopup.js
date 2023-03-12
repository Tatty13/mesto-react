function ImagePopup({isOpen, card, onClose}) {

  return (
    <dialog className={`popup popup_content_photo ${isOpen ? 'popup_open' : ''}`} onMouseDown={onClose}>
      <div className="popup__img-container">
        <img className="popup__img" src={card.link} alt={card.name} />
        <span className="popup__img-heading">{card.name}</span>
        <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
      </div>
    </dialog>
  )
}

export default ImagePopup;
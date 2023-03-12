function ErrorPopup({error, isOpen, onClose}) {
  return (
    <dialog className={`popup popup_content_notification ${isOpen ? 'popup_open' : ''}`} onMouseDown={onClose}>
      <div className="popup__container popup__container_content_notification">
        <h2 className="popup__title">Упс... Кажется, что-то пошло не так.</h2>
        <p className="popup__subtitle">{error}</p>
        <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
      </div>
    </dialog>
  )
}


export default ErrorPopup;
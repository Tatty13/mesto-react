function ErrorPopup() {
  return (
    <dialog className="popup popup_content_notification">
      <div className="popup__container popup__container_content_notification">
        <h2 className="popup__title"> </h2>
        <p className="popup__subtitle"></p>
        <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
      </div>
    </dialog>
  )
}

export default ErrorPopup;
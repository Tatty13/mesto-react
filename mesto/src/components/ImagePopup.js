function ImagePopup({onClose}) {

  return (
    <dialog className="popup popup_content_photo">
      <div className="popup__img-container">
        <img className="popup__img" src="#" alt="" />
        <span className="popup__img-heading"></span>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </dialog>
  )
}

export default ImagePopup;
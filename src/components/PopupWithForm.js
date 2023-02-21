function PopupWithForm({isOpen, title, name, submitBtnText, children, onClose}) {
  
  return (
    <dialog className={`popup popup_content_${name} ${isOpen ? 'popup_open' : ''}`} onMouseDown={onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_type_${name}`} action="#" name={name} id={name} noValidate>
          {children}
          <button className="form__submit-btn" type="submit" name="submit-btn">{submitBtnText}</button>
        </form>
        <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
      </div>
    </dialog>
  )
}

export default PopupWithForm;

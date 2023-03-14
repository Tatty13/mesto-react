function PopupWithForm({ isOpen, isLoading, title, name, submitBtnText, loadingText, children, onClose, onSubmit }) {
  return (
    <dialog
      className={`popup popup_content_${name} ${isOpen ? "popup_open" : ""}`}
      onMouseDown={onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form form_type_${name}`}
          action="#"
          name={name}
          id={name}
          onSubmit={onSubmit}
          noValidate>
          {children}
          <button className="form__submit-btn" type="submit" name="submit-btn">
            {isLoading
              ? loadingText || "Сохранение..."
              : submitBtnText || "Сохранить"}
          </button>
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"></button>
      </div>
    </dialog>
  );
}

export default PopupWithForm;

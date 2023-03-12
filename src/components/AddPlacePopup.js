import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace, cardData}) {
  const {name, link, setCardName, setCardLink} = cardData;

  function handleInputChange(evt, setInputValue) {
    setInputValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name, link});
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='Новое место'
      name='add-card'
      submitBtnText='Создать'
      children={(
        <>
          <label>
            <input className="form__input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" value={name} onChange={evt => handleInputChange(evt, setCardName)} required />
            <span className="form__input-error name-input-error"></span>
          </label>
          <label>
            <input className="form__input" type="url" name="link" placeholder="Ссылка на картинку" value={link} onChange={evt => handleInputChange(evt, setCardLink)} required />
            <span className="form__input-error link-input-error"></span>
          </label>
        </>
      )}
    />
  )
}

export default AddPlacePopup;
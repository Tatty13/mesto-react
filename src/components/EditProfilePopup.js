import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleInputChange(evt, setInputValue) {
    setInputValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='Редактировать профиль'
      name='edit-profile'
      children={(
        <>
          <label>
            <input className="form__input" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" value={name} onChange={evt => handleInputChange(evt, setName)} required />
            <span className="form__input-error name-input-error"></span>
          </label>
          <label>
            <input className="form__input" type="text" name="about" minLength="2" maxLength="200" placeholder="Введите род деятельности" value={description} onChange={evt => handleInputChange(evt, setDescription)} required />
            <span className="form__input-error about-input-error"></span>
          </label>
        </>
      )}
    />)
}

export default EditProfilePopup;
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    name: currentUser.name,
    about: currentUser.about,
  });

  function handleInputChange(evt) {
    setUserData({ ...userData, [evt.target.name]: evt.target.value });
  }

  useEffect(() => {
    isOpen && setUserData({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(userData);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-profile">
      <>
        <label>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
          <span className="form__input-error name-input-error"></span>
        </label>
        <label>
          <input
            className="form__input"
            type="text"
            name="about"
            minLength="2"
            maxLength="200"
            placeholder="Введите род деятельности"
            value={userData.about}
            onChange={handleInputChange}
            required
          />
          <span className="form__input-error about-input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

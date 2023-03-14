import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    isOpen && (avatarRef.current.value = "");
  }, [isOpen]);

  function onSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Обновить аватар"
      name="edit-avatar">
      <label>
        <input
          ref={avatarRef}
          className="form__input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

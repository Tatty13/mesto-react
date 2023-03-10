import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, avatarRef}) {

  function onSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: avatarRef.current.value});
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={'Обновить аватар'}
      name={'edit-avatar'}
      children={(
        <label>
          <input ref={avatarRef} className="form__input" type="url" name="avatar" placeholder="Ссылка на картинку" required />
          <span className="form__input-error avatar-input-error"></span>
        </label>
      )}
    />
  )
}

export default EditAvatarPopup;
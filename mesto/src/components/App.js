import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import ErrorPopup from './ErrorPopup';

function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState();
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState();
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState();

  
  function handleEditAvatarClick() {
    setEditAvatarPopupState(!isEditAvatarPopupOpen);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(!isEditProfilePopupOpen);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(!isAddPlacePopupOpen);
    document.addEventListener('keydown', handleEscClose);
  }

  /* -------------------------------------------- */
  function closePopup(popup) {
    document.removeEventListener('keydown', handleEscClose);
    popup.classList.remove('popup_open');
  }
  
  function handleEscClose (evt) {
    if (evt.code === 'Escape')
    closePopup(document.querySelector('.popup_open'));
  }
  
  function closeAllPopups(evt) {
    const currentTarget = evt.target;
    const popup = currentTarget.closest('.popup');
    if (currentTarget === popup || currentTarget.classList.contains('popup__close-btn')) {
      closePopup(popup)
    }
  }
  /* -------------------------------------------- */

  return (
    <>
      <div className="page__wrap">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title={'Обновить аватар'}
        name={'edit-avatar'}
        submitBtnText={'Сохранить'}
        onClose={closeAllPopups}
        children={(
          <label>
            <input className="form__input" type="url" name="avatar" placeholder="Ссылка на картинку" required />
            <span className="form__input-error avatar-input-error"></span>
          </label>
        )}
      />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title={'Редактировать профиль'}
        name={'edit-profile'}
        submitBtnText={'Сохранить'}
        onClose={closeAllPopups}
        children={(
          <>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label>
              <input className="form__input" type="text" name="about" minLength="2" maxLength="200" placeholder="Введите род деятельности" required />
              <span className="form__input-error about-input-error"></span>
            </label>
          </>
        )}
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        title={'Новое место'}
        name={'add-card'}
        submitBtnText={'Создать'}
        onClose={closeAllPopups}
        children={(
          <>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label>
              <input className="form__input" type="url" name="link" placeholder="Ссылка на картинку" required />
              <span className="form__input-error link-input-error"></span>
            </label>
          </>
        )}
      />

      <PopupWithForm
        isOpen={false}
        title={'Вы уверены?'}
        name={'confirmation'}
        submitBtnText={'Да'}
        onClose={closeAllPopups}
        children={''}
      />

      <ImagePopup onClose={closeAllPopups}/>
      <ErrorPopup onClose={closeAllPopups}/>


      <template className="card-template">
        <li className="card">
          <div className="card__img-wrap">
            <img className="card__img" src="#" alt="" />
          </div>
          <h2 className="card__title"> </h2>
          <div className="card__like">
            <button className="card__like-btn" type="button" aria-label="Нравится"></button>
            <span className="card__like-count"></span>
          </div>
          <button className="card__delete-btn" type="button" aria-label="Удалить"></button>
        </li>
      </template>
    </>
  );
}

export default App;

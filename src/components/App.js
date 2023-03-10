import {useEffect, useState, useRef} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ErrorPopup from './ErrorPopup';
import api from '../utils/api';

function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, name: '', link: ''});
  const [error, setError] = useState({isOpen: false, errorText: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /**
   * set avatar ref in App to clear input on opening avatarPopup
   */
  const avatarRef = useRef();
  
  function handleEditAvatarClick() {
    avatarRef.current.value = '';
    setEditAvatarPopupState(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(!isAddPlacePopupOpen);
  }

  function handleCardClick({name, link}) {
    setSelectedCard({
      isOpen: !error.isOpen,
      name,
      link
    })
  }

  function handleErrorCatch(errorText) {
    setError({
      isOpen: !error.isOpen,
      errorText
    })
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';

    api.toogleCardLike(card._id, method)
      .then(updatedCard => {
        setCards(
          cards.map(item => item._id === updatedCard._id ? updatedCard : item)
        )
      })
      .catch(err => handleErrorCatch(err))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(_ => {
        setCards(cards.filter(item => item._id !== cardId))
      })
      .catch(err => handleErrorCatch(err))
  }

  function handleUpdateUser(userData) {
    api.setUserData(userData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(err => handleErrorCatch(err))
  }

  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(err => handleErrorCatch(err))
  }
  
  useEffect(() => {
    api.getUserData()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => handleErrorCatch(err))
  }, []);

  /* -------------------------------------------- */
  function closeAllPopups() {
    if (isEditAvatarPopupOpen) setEditAvatarPopupState(!isEditAvatarPopupOpen);
    if (isEditProfilePopupOpen) setEditProfilePopupState(!isEditProfilePopupOpen);
    if (isAddPlacePopupOpen) setAddPlacePopupState(!isAddPlacePopupOpen);
    if (selectedCard.isOpen) setSelectedCard({...selectedCard, isOpen: !selectedCard.isOpen});
    if (error.isOpen) setError({...error, isOpen: !error.isOpen});
  }

  function handleCloseAllPopups(evt) {
    const currentTarget = evt.target;
    const popup = currentTarget.closest('.popup');
    if (currentTarget === popup || currentTarget.classList.contains('popup__close-btn')) 
      closeAllPopups();
  }
  /* -------------------------------------------- */

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <>
        <div className="page__wrap">
          <Header />
          <Main
            cards={cards}
            setCards={setCards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onError={handleErrorCatch}
            onLikeBtnClick={handleCardLike}
            onDeleteBtnClick={handleCardDelete}
          />
          <Footer />
        </div>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          avatarRef={avatarRef}
        />
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          title={'Новое место'}
          name={'add-card'}
          submitBtnText={'Создать'}
          onClose={handleCloseAllPopups}
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
          onClose={handleCloseAllPopups}
          children={''}
        />

        <ImagePopup
          card={selectedCard}
          onClose={handleCloseAllPopups}/>

        <ErrorPopup
          error={error}
          onClose={handleCloseAllPopups}/>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;

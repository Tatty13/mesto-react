import {useEffect, useState, useRef, useCallback} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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

  const handleErrorCatch = useCallback(errorText => {
    setError({
      isOpen: true,
      errorText
    })
  }, []);

  
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
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';

    api.toogleCardLike(card._id, method)
      .then(updatedCard => {
        setCards(
          cards.map(item => item._id === updatedCard._id ? updatedCard : item)
        )
      })
      .catch(handleErrorCatch)
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(_ => {
        setCards(cards.filter(item => item._id !== cardId))
      })
      .catch(handleErrorCatch)
  }

  function handleUpdateUser(userData) {
    api.setUserData(userData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
  }

  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then(newCard => {
        setCards([
          newCard,
          ...cards
        ]);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
  }
  
  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentUser(user);
        setCards([
          ...cardsData
        ]);
      })
      .catch(handleErrorCatch)
  }, [handleErrorCatch]);

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
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
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

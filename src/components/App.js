import {useEffect, useState, useRef, useCallback} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ErrorPopup from './ErrorPopup';
import api from '../utils/api';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupState] = useState(false);
  const [isErrorPopupOpen, setErrorPopupState] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  // const [isAnyPopupOpen, setIsAnyPopupOpen] = useState(false);

  // function handleEscClose(evt) {
  //   if (evt.code === 'Escape') {
  //     closeAllPopups();
  //   }
  // }

  /**
   * set card data in App to clear AddPlacePopup inputs on opening AddPlacePopup
   */
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  /* -------------------------------------------- */
  const popupsState = [
    {state: isEditAvatarPopupOpen, setter: setEditAvatarPopupState}, 
    {state: isEditProfilePopupOpen, setter: setEditProfilePopupState},
    {state: isAddPlacePopupOpen, setter: setAddPlacePopupState},
    {state: isImagePopupOpen, setter: setImagePopupState},
    {state: isDeleteCardPopupOpen, setter: setDeleteCardPopupState},
    {state: isErrorPopupOpen, setter: setErrorPopupState},
  ];

  function handleEscClose(evt) {
    if (evt.code === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    popupsState.some(({state}) => state === true) && document.addEventListener('keydown', handleEscClose);
  })

  function closeAllPopups() {
    document.removeEventListener('keydown', handleEscClose);
    popupsState.forEach(popup => {
      if (popup.state) popup.setter(false);
    })
  }

  function handleCloseAllPopups(evt) {
    const currentTarget = evt.target;
    const popup = currentTarget.closest('.popup');
    if (currentTarget === popup || currentTarget.classList.contains('popup__close-btn')) 
      closeAllPopups();
  }
  /* -------------------------------------------- */

  const handleErrorCatch = useCallback(errorText => {
    setErrorPopupState(true);
    setErrorText(errorText);
  }, []);

  /**
   * set avatar ref in App to clear input on opening avatarPopup
   */
  const avatarRef = useRef();
  
  function handleEditAvatarClick() {
    avatarRef.current.value = '';
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    /**
     * to display user info if the popup was closed with empty inputs
     */
    setCurrentUser({...currentUser});
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setCardName('');
    setCardLink('');
    setAddPlacePopupState(true);
  }

  function handleCardClick({name, link}) {
    setSelectedCard({
      name,
      link
    });
    setImagePopupState(true);
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
      .catch(handleErrorCatch);
  }

  function handleDeleteCardPopupOpen(cardId) {
    setSelectedCard({id: cardId});
    setDeleteCardPopupState(true);
  }

  function handleCardDelete(cardId) {
    setLoading(true);
    api.deleteCard(cardId)
      .then(_ => {
        setCards(cards.filter(item => item._id !== cardId));
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(setLoading(false));
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    api.setUserData(userData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(setLoading(false));
  }

  function handleUpdateAvatar(avatarData) {
    setLoading(true);
    api.updateAvatar(avatarData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(setLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setLoading(true);
    api.addCard(cardData)
      .then(newCard => {
        setCards([
          newCard,
          ...cards
        ]);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(setLoading(false));
  }
  
  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentUser(user);
        setCards([
          ...cardsData
        ]);
      })
      .catch(handleErrorCatch);
  }, [handleErrorCatch]);

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
            onDeleteBtnClick={handleDeleteCardPopupOpen}
          />
          <Footer />
        </div>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          avatarRef={avatarRef}
        />
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          cardData={{name: cardName, link: cardLink, setCardName, setCardLink}}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          isLoading={isLoading}
          onClose={handleCloseAllPopups}
          onDeleteConfirm={handleCardDelete}
          card={selectedCard}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={handleCloseAllPopups}/>

        <ErrorPopup
          error={errorText}
          isOpen={isErrorPopupOpen}
          onClose={handleCloseAllPopups}/>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;

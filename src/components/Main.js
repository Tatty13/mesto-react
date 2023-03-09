import {useEffect, useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import defaultAvatar from '../images/avatar.png';
import api from '../utils/api';
import Card from './Cards';


function Main({cards, setCards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onError, onLikeBtnClick}) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards()
      .then(cardsData => {
        setCards([
          ...cards,
          ...cardsData
        ])
      })
      .catch(err => onError(err))
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar || defaultAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Место">
        <ul className="cards__list">{cards.map(card => (
              <Card card={card} key={card._id} onCardClick={onCardClick} onLikeBtnClick={onLikeBtnClick}/>
              )
            )}</ul>
      </section>
    </main>
  )
}

export default Main;
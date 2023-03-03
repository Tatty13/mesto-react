import {useState, useEffect} from 'react';
import defaultAvatar from '../images/avatar.png';
import api from '../utils/api';
import Card from './Cards';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onError}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([{name, about, avatar}, cardsData]) => {
          setUserName(name);
          setUserDescription(about);
          setUserAvatar(avatar);
          setCards([
            ...cards,
            ...cardsData
          ])
        })
        .catch(err => onError(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar ? userAvatar : defaultAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Место">
        <ul className="cards__list">{cards.map(card => (
          <Card 
            key={card._id}
            name={card.name}
            link={card.link}
            likesCount={card.likes.length}
            onCardClick={onCardClick}/>
        ))}</ul>
      </section>
    </main>
  )
}

export default Main;
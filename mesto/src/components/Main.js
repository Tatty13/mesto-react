import React from 'react';
import defaultAvatar from '../images/avatar.png';
import api from '../utils/api';
import Card from './Cards';
// import ErrorPopup from './ErrorPopup';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([{name, about, avatar}, cardsData]) => {
          setUserName(name);
          setUserDescription(about);
          setUserAvatar(avatar);
          setCards([
            ...cards,
            ...cardsData.map(data => (
              <Card card={data} key={data._id} onCardClick={onCardClick}/>
              )
            )
          ])
        })
        .catch(err => console.log(err))
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
        <ul className="cards__list">{cards}</ul>
      </section>
    </main>
  )
}

export default Main;
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  // this._isLiked = this._likes.some(user => user._id === this._userID);

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <div className="card__img-wrap">
        <img className="card__img" src={card.link} alt={card.name} onClick={handleClick}/>
      </div>
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like">
        <button className={`card__like-btn ${isLiked && 'card__like-btn_active'}`} type="button" aria-label="Нравится"></button>
        <span className="card__like-count">{card.likes.length || ''}</span>
      </div>
      {isOwn && <button className="card__delete-btn" type="button" aria-label="Удалить"></button>}
    </li>
  )
}

export default Card;
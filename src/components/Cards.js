function Card({card, onCardClick}) {

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
        <button className="card__like-btn" type="button" aria-label="Нравится"></button>
        <span className="card__like-count"></span>
      </div>
      <button className="card__delete-btn" type="button" aria-label="Удалить"></button>
    </li>
  )
}

export default Card;
function Card({name, link, likesCount, onCardClick}) {

  function handleClick() {
    onCardClick({name, link});
  }

  return (
    <li className="card">
      <div className="card__img-wrap">
        <img className="card__img" src={link} alt={name} onClick={handleClick}/>
      </div>
      <h2 className="card__title">{name}</h2>
      <div className="card__like">
        <button className="card__like-btn" type="button" aria-label="Нравится"></button>
        <span className="card__like-count">{likesCount || ''}</span>
      </div>
      <button className="card__delete-btn" type="button" aria-label="Удалить"></button>
    </li>
  )
}

export default Card;
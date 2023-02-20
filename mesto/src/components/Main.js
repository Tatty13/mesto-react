import defaultAvatar from '../images/avatar.png';

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img className="profile__avatar" src={defaultAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name"> </h1>
          <p className="profile__about"></p>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать"></button>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить"></button>
      </section>
      <section className="cards" aria-label="Место">
        <ul className="cards__list"></ul>
      </section>
    </main>
  )
}

export default Main;
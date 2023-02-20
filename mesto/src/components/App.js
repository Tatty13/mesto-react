import defaultAvatar from '../images/avatar.png';
// import './App.css';

function App() {
  return (
    <>
      <div classNameName="page__wrap">
        <header classNameName="header">
          <a classNameName="logo" href="#root"> </a>
        </header>
        <main classNameName="content">
          <section classNameName="profile">
            <div classNameName="profile__avatar-wrap">
              <img classNameName="profile__avatar" src={defaultAvatar} alt="Аватар" />
            </div>
            <div classNameName="profile__info">
              <h1 classNameName="profile__name"> </h1>
              <p classNameName="profile__about"></p>
              <button classNameName="profile__edit-btn" type="button" aria-label="Редактировать"></button>
            </div>
            <button classNameName="profile__add-btn" type="button" aria-label="Добавить"></button>
          </section>
          <section classNameName="cards" aria-label="Место">
            <ul classNameName="cards__list"></ul>
          </section>
        </main>
        <footer classNameName="footer">
          <p classNameName="footer__copyright">© 2020 Mesto Russia</p>
        </footer>
      </div>

      <dialog className="popup popup_content_edit-profile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form form_type_edit-profile" action="#" name="editProfile" id="editProfile" novalidate>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Введите имя" minlength="2" maxlength="40" required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label>
              <input className="form__input" type="text" name="about" minlength="2" maxlength="200" placeholder="Введите род деятельности" required />
              <span className="form__input-error about-input-error"></span>
            </label>
            <button className="form__submit-btn" type="submit" name="submit-btn">Сохранить</button>
          </form>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <dialog className="popup popup_content_edit-avatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="form form_type_edit-avatar" action="#" name="editAvatar" id="editAvatar" novalidate>
            <label>
              <input className="form__input" type="url" name="avatar" placeholder="Ссылка на картинку" required />
              <span className="form__input-error avatar-input-error"></span>
            </label>
            <button className="form__submit-btn" type="submit" name="submit-btn">Сохранить</button>
          </form>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <dialog className="popup popup_content_add-card">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <form className="form form_type_add-card" action="#" name="addCard" id="addCard" novalidate>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Название" minlength="2" maxlength="30" required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label>
              <input className="form__input" type="url" name="link" placeholder="Ссылка на картинку" required />
              <span className="form__input-error link-input-error"></span>
            </label>
            <button className="form__submit-btn" type="submit" name="submit-btn">Создать</button>
          </form>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <dialog className="popup popup_content_photo">
        <div className="popup__img-container">
          <img className="popup__img" src="#" alt="" />
          <span className="popup__img-heading"></span>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <dialog className="popup popup_content_confirmation">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="form form_type_confirmation" action="#" name="confirmDelete" id="confirmDelete" novalidate>
            <button className="form__submit-btn" type="submit" name="submit-btn">Да</button>
          </form>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <dialog className="popup popup_content_notification">
        <div className="popup__container popup__container_content_notification">
          <h2 className="popup__title"> </h2>
          <p className="popup__subtitle"></p>
          <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
        </div>
      </dialog>

      <template className="card-template">
        <li className="card">
          <div className="card__img-wrap">
            <img className="card__img" src="#" alt="" />
          </div>
          <h2 className="card__title"> </h2>
          <div className="card__like">
            <button className="card__like-btn" type="button" aria-label="Нравится"></button>
            <span className="card__like-count"></span>
          </div>
          <button className="card__delete-btn" type="button" aria-label="Удалить"></button>
        </li>
      </template>
    </>
  );
}

export default App;

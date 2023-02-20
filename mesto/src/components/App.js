import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="page__wrap">
        <Header />
        <Main />
        <Footer />
      </div>

      <dialog className="popup popup_content_edit-profile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form form_type_edit-profile" action="#" name="editProfile" id="editProfile" noValidate>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label>
              <input className="form__input" type="text" name="about" minLength="2" maxLength="200" placeholder="Введите род деятельности" required />
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
          <form className="form form_type_edit-avatar" action="#" name="editAvatar" id="editAvatar" noValidate>
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
          <form className="form form_type_add-card" action="#" name="addCard" id="addCard" noValidate>
            <label>
              <input className="form__input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
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
          <form className="form form_type_confirmation" action="#" name="confirmDelete" id="confirmDelete" noValidate>
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

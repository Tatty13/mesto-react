import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
  const [cardData, setCardData] = useState({ name: "", link: "" });

  useEffect(() => {
    isOpen && setCardData({ name: "", link: "" });
  }, [isOpen]);

  function handleInputChange(evt) {
    setCardData({ ...cardData, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(cardData);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-card"
      submitBtnText="Создать">
      <>
        <label>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={cardData.name}
            onChange={handleInputChange}
            required
          />
          <span className="form__input-error name-input-error"></span>
        </label>
        <label>
          <input
            className="form__input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            value={cardData.link}
            onChange={handleInputChange}
            required
          />
          <span className="form__input-error link-input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, onDeleteConfirm, card}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteConfirm(card.id);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={'Вы уверены?'}
      name={'confirmation'}
      submitBtnText={'Да'}
      children={''}
    />
  )
}

export default DeleteCardPopup;
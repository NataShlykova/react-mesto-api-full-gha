import React, {useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import useForm from "../hooks/useForm"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const { handleChange, reset, values } = useForm();
  const currentUser = React.useContext(CurrentUserContext)

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  useEffect(() => {
    currentUser ? reset(currentUser) : reset()
  }, [currentUser, isOpen, reset]);

  return (
    <PopupWithForm
      name='profile-edit'
      onSubmit={handleSubmit}
      title='Редактировать профиль'
      buttonText='Сохранить'
      isModal={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        name="name"
        type="text"
        className="popup__input popup__input_string_name"
        id="userName-input"
        placeholder="Имя"
        minLength="2"
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__error-input  inputStringName-error"></span>
      <input
        name="about"
        type="text"
        className="popup__input popup__input_string_work"
        id="userAbout-input"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ''}
        onChange={handleChange}
      />
      <span className="popup__error-input inputStringWork-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
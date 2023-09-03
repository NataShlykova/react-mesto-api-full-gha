import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import useForm from '../hooks/useForm'

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const { handleChange, reset, values } = useForm();


  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: values.name,
      link: values.link,
    })
  }

  useEffect(() => {
    reset()
  }, [isOpen, reset])

  return (
    <PopupWithForm
    name='card-add'
    title='Новое место'
    buttonText='Создать'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        className="popup__input popup__input_string_name-photo"
        id="placeName-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name || ''}
      />
      <span className="popup__error-input strigNamePhoto-error"></span>
      <input
        name="link"
        type="url"
        className="popup__input popup__input_string_link"
        id="placeUrl-input"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ''}
      />
      <span className="popup__error-input stringLinkPhoto-error"></span>        
    </PopupWithForm>
  )
}

export default AddPlacePopup
import React, { useEffect } from 'react'
import AuthPage from './AuthPage'
import useForm from '../hooks/useForm';

export default function Register({ onRegister }) {

  const { handleChange, reset, values } = useForm({});

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(values)
  }

  useEffect(() => {
    reset();
  }, [reset]);


  return (
    <div className='register'>
      <AuthPage
        formName='register'
        onSubmit={handleSubmit}
        title='Регистрация'
        buttonText='Зарегистрироваться'
      >
        <input
          name="email"
          type="email"
          className="popup__input popup__input_type_login"
          id="email"
          placeholder="Email"
          minLength="6"
          maxLength="40"
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="popup__input popup__input_type_login"
          id="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="40"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
      </AuthPage>
    </div>
  )
}
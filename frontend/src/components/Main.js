import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  handleCardLike,
  handleCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar'>
          <button
            type='button'
            className='profile__avatar-edit-button'
            onClick={onEditAvatar}
          >
            <img
              src={`${currentUser.avatar}`}
              alt='Изображение профиля'
              className='profile__avatar-image'
            />
          </button>

          <div className='profile__info'>
            <div className='profile__name'>
              <h1 className='profile__title'>{currentUser.name}</h1>
              <button
                type='button'
                className='profile__edit-button'
                aria-label='Редактировать профиль'
                onClick={onEditProfile}
              />
            </div>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>
        <button
          type='button'
          className='profile__add-button'
          aria-label='Добавить изображение'
          onClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              link={card.link}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;

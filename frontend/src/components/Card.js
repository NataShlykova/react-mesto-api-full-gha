import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Card({card, onCardLike, onCardClick, ...props}) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some((item) => {
      return item._id === currentUser._id
    })
    const cardDeleteButtonClassName = (
      `element__button-delete ${isOwn ? '' : 'element__button-delete_state_hidden'}`
    )
    const cardLikeButtonClassName  = (
      `element__button ${isLiked && 'element__button_active'}`
    )
  
    function handleCardClick() {
     onCardClick(card)
    }
  
    function handleLikeClick() {
      onCardLike(card)
    }
  
    function handleDeleteClick() {
      props.onCardDelete(card)
    }

    return (
        <article className="element">
            <button type="button"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
                aria-label="Удалить изображение"></button>
            <img
                src={card.link}
                className="element__image"
                alt={card.name}
                onClick={handleCardClick}
            />
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-cont">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>

        </article>
    )
}

export default Card

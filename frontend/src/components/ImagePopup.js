import React  from 'react';

function ImagePopup({ isOpen, onClose, card }) {

  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container popup__click-overley">
        <button
          type="button"
          className="popup__close-button popup__close-button-zoom"
          onClick={onClose}
        >
        </button>
        <figure className="popup__image-zoom">

          <img
            src={card?.link}
            className="popup__img"
            alt={card?.name}
          />
          <figcaption
            className="popup__paragraph">
            {card?.name}
          </figcaption>
        </figure>

      </div>
    </div>
  )
}

export default ImagePopup
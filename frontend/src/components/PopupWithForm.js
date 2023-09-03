import React  from 'react';
function PopupWithForm({ name, title, isOpen, children, onSubmit, buttonText, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__click-overley">
                <form
                    className="popup__form"
                    name={`${name}`}
                    onSubmit={onSubmit}
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        type="submit"
                        className="popup__submit"
                    >
                        {buttonText}
                    </button>
                </form>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                >
                </button>
            </div>
        </div>
    )
}

export default PopupWithForm
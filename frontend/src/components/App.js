import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import unSuccess from '../images/unsuccess.svg';

function App () {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ imgPath: '', text: '' });

  const [email, setEmail] = useState('');

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const tokenCheck = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const user = await api.getUserInfo(jwt);
        const cards = await api.getInitialCards(jwt);
        setCurrentUser(user);
        setCards(cards.data);
        setLoggedIn(true);
        setEmail(user.email);
        history.push('/');
      } catch (err) {
        console.error(err);
      }
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, []);


  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsImagePopupOpen(false);
  }

  function onCardClick (card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function onUpdateUser (userData) {
    const jwt = localStorage.getItem('jwt');
    api
      .setUserInfoApi(userData, jwt)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onUpdateAvatar (userData) {
    const jwt = localStorage.getItem('jwt');
    api
      .handleUserAvatar(userData, jwt)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((item) => {
        const newCard = cards.map(c =>
        (c._id === card._id ? item.data : c
        ));
        setCards(newCard);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete (card) {
    const jwt = localStorage.getItem('jwt');
    api
      .delete(card._id, jwt)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit (cardData) {
    const jwt = localStorage.getItem('jwt');
    api
      .addUserCard(cardData, jwt)
      .then((newCard) => {
        // console.log('newdata', newCard.data)
        // console.log('cards', cards)
        setCards([newCard.data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  const handleAuth = useCallback(
    async (info) => {
      try {
        const data = await auth.authorize(info);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmail(info.email);
          history.push('/', { replace: true });
          tokenCheck();
        }
      } catch (e) {
        console.error(e);
        setMessage({
          imgPath: unSuccess,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      }
    },
    [history]
  );

  const handleRegistration = useCallback(async (info) => {
    try {
      const data = await auth.register(info);
      if (data) {
        setIsInfoTooltipOpen(true);
        setMessage({
          imgPath: success,
          text: 'Вы успешно зарегистрировались!',
        });
        history.push('/sign-in', { replace: true });
      }
    } catch (e) {
      console.error(e);
      setIsInfoTooltipOpen(true);
      setMessage({
        imgPath: unSuccess,
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
      });
    }
  }, [history]);

  function onSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path='/sign-up'> <Register
            onRegister={handleRegistration}
            isOpen={isEditProfilePopupOpen}
            isInfoTooltipOpen={isInfoTooltipOpen}
          />
          </Route>
          <Route path='/sign-in'> <Login onAuth={handleAuth} isOpen={isEditProfilePopupOpen} />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          name='tooltip'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          imgPath={message.imgPath}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />
        <PopupWithForm
          name='confirm-delete'
          title='Вы уверены?'
          buttonText='Да'
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

const Card = require('../models/card');
const NotFoundError = require('../utils/errors/notFound-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const {
  VALIDATION_CODE,
} = require('../utils/Constans');
const ValidationError = require('../utils/errors/validation-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(VALIDATION_CODE).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации данных'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с указанным _id не cуществует');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Удалять можно только свою карточку');
      }
      return Card.deleteOne({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((cardDeleted) => {
          res.send({ data: cardDeleted });
        })
        .catch(next);
    })
    .catch(next);
};

const verification = (card, res, next) => {
  if (card) {
    return res.send({ data: card });
  }
  const error = new NotFoundError('Карточки с указанным _id не cуществует');
  return next(error);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => card.populate([{ path: 'owner', model: 'user' }, { path: 'likes', model: 'user' }]))
    .then((user) => verification(user, res))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => verification(user, res))
    .catch((err) => next(err));
};

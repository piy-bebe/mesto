export default class Card {
  constructor({ name, link, likes, ownerId, cardId, isLike, userId }, handleCardClick, handleCardDelete, handleCardLike, template) {
    this._name = name
    this._link = link
    this._likes = likes
    this._ownerId = ownerId
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike
    this._isLike = isLike

    this._cardId = cardId
    this._template = template
    this._userId = userId
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector('.elements__element')
      .cloneNode(true)

    return cardElement
  }

  _handleTrash() {
    this._element.remove()
  }

  updateLikes(likes) {
    this._isLike = !this._isLike
    return likes.length;
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleCardLike(evt, this._cardId, this._isLike, this)
    })

    if(this._ownerId === this._userId) {
      this._element
      .querySelector('.elements__trash')
      .addEventListener('click', (evt) => {
        this._handleCardDelete(this._element, this._cardId)
      })
    }
    this._element
      .querySelector('.elements__photo')
      .addEventListener('click', () => {
        this._handleCardClick()
      })
  }

  generateCard() {
    this._element = this._getTemplate()
    if(this._isLike) {
      this._element.querySelector('.elements__like').classList.add('elements__like_active')
    }
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.elements__trash').remove()
    }


    this._setEventListeners()

    this._element.querySelector('.elements__title').textContent = this._name
    this._element.querySelector('.elements__count').textContent = this._likes

    const elementsPhoto = this._element.querySelector('.elements__photo')
    elementsPhoto.src = this._link
    elementsPhoto.alt = this._name

    return this._element
  }
}

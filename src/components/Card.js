export default class Card {
  constructor({ name, link, likes, ownerId }, handleCardClick, handleCardDelete) {
    this._name = name
    this._link = link
    this._likes = likes
    this._ownerId = ownerId
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content.querySelector('.elements__element')
      .cloneNode(true)

    return cardElement
  }

  _handleTrash() {
    this._element.remove()
  }

  _handleLike(evt) {
    const target = evt.target.closest('.elements__like')
    if (!target) return
    target.classList.toggle('elements__like_active')
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleLike(evt)
    })

    if(this._ownerId === "8dceed107174cd6abf1932ff") {
      this._element
      .querySelector('.elements__trash')
      .addEventListener('click', (evt) => {
        this._handleCardDelete(this._element)
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

    if(this._ownerId !== "8dceed107174cd6abf1932ff") {
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

const popupCloseButton = document.querySelector('#photoClose')

export default class Card {
  constructor({ name, link, cardSelector }, handleCardClick, handleCardClose) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleCardClose = handleCardClose
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
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
    this._element
      .querySelector('.elements__trash')
      .addEventListener('click', (evt) => {
        this._handleTrash(evt)
      })
    this._element
      .querySelector('.elements__photo')
      .addEventListener('click', () => {
        this._handleCardClick()
      })
    popupCloseButton.addEventListener('click', () => {
      this._handleCardClose()
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.elements__title').textContent = this._name

    const elementsPhoto = this._element.querySelector('.elements__photo')
    elementsPhoto.src = this._link
    elementsPhoto.alt = this._name

    return this._element
  }
}

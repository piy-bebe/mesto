const popupPhotoImage = document.querySelector('.popup__image')
const popupPhotoSubtitle = document.querySelector('.popup__subtitle')
const popupCloseButton = document.querySelector('#photoClose')
const popupPhoto = document.querySelector('#photoPopup')

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true)

    return cardElement
  }

  _handleTrash(evt) {
    this._element.remove()
  }

  _handleLike(evt) {
    const target = evt.target.closest('.elements__like')
    if (!target) return
    target.classList.toggle('elements__like_active')
  }

  _closeEscPopup(e) {
    if (e.key === 'Escape') {
      this._handleClosePopup()
    }
  }

  _handleOpenPopup() {
    popupPhotoImage.src = this._link
    popupPhotoSubtitle.textContent = this._name
    popupPhoto.classList.add('popup_opened')
    document.addEventListener('keydown', (e) => {
      this._closeEscPopup(e)
    })
  }

  _handleClosePopup() {
    popupPhoto.classList.remove('popup_opened')
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
        this._handleOpenPopup()
      })
    popupCloseButton.addEventListener('click', (evt) => {
      this._handleClosePopup(evt)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.elements__title').textContent = this._name
    this._element.querySelector('.elements__photo').src = this._link
    this._element.querySelector('.elements__photo').alt = this._name

    return this._element
  }
}

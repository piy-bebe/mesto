const popupCloseButton = document.querySelector('#photoClose')

export default class Card {
  constructor(data, cardSelector, openPhoto, closePhoto) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this._openPhoto = openPhoto
    this._closePhoto = closePhoto
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

  // _closeEscPopup(e) {
  //   if (e.key === 'Escape') {
  //     this._handleClosePopup()
  //   }
  // }

  // _handleOpenPopup() {
  //   popupPhotoImage.src = this._link
  //   popupPhotoSubtitle.textContent = this._name
  //   popupPhoto.classList.add('popup_opened')
  //   document.addEventListener('keydown', (e) => {
  //     this._closeEscPopup(e)
  //   })
  // }

  // _handleClosePopup() {
  //   popupPhoto.classList.remove('popup_opened')
  // }

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
        this._openPhoto()
      })
    popupCloseButton.addEventListener('click', () => {
      this._closePhoto()
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

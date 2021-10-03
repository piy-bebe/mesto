export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
      this._popupElement.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        this.close()
      }
    })

    this._popupElement
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.close()
      })
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}

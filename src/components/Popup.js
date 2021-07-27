export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    if (document.querySelector('.popup_opened')) {
      document.querySelector('.popup_opened').classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEscClose)
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector('.popup__close')
      .addEventListener('click', this.close)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}

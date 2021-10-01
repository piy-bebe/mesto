export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
  }

  close() {
    if (document.querySelector('.popup_opened')) {
      document.querySelector('.popup_opened').classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEscClose)
    }
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

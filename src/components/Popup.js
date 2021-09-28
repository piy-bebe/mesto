export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this._kek = popupSelector
    console.log(this._kek)
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


    document.querySelector('#photoPopup').addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        alert(this._kek)
      }
    })

    document.querySelector('#photoClose').addEventListener('click', () => {
      this.close()
    })
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    
    this._popupSelector.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup')) {
        this.close()
      }
    })
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
      document.addEventListener('keydown', (e) => {
        this._handleEscClose(e)
      })

    

  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}

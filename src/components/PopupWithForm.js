import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popup, button, handleSubmit }) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._buttonSelector = document.querySelector(button)
    this._form = this._popupElement.querySelector('.popup__form')
  }

  close() {
    super.close()
    if(this._form) { 
      this._form.reset() 
      this._form.querySelector('.popup__button').setAttribute("disabled", true)
      this._form.querySelector('.popup__button').classList.add('popup__button_inactive')
    }
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formValues = {}
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    )

    return this._formValues
  }

  open() {
    super.open()
    document.querySelector('#name-input').value = document.querySelector('.profile__name').textContent
    document.querySelector('#job-input').value = document.querySelector('.profile__job').textContent
  }

  setEventListeners() {
    super.setEventListeners()

    this._buttonSelector.addEventListener('click', () => {
      this.open()
    })

    this._popupElement
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.close()
      })

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault()

      this._handleSubmit(this._getInputValues())
      this.close()
    })
  }
}

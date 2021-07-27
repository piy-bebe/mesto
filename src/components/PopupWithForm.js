import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popup, button, handleSubmit }) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._buttonSelector = document.querySelector(button)
    this._form = this._popupSelector.querySelector('.popup__form')
  }

  close() {
    super.close()
    this._popupSelector.querySelector('.popup__form').reset()
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formValues = {}
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    )

    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()

    this._buttonSelector.addEventListener('click', () => {
      super.open()
    })

    this._popupSelector
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.close()
      })

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault()

      this._handleSubmit(this._getInputValues())
      this.close()
    })
  }
}

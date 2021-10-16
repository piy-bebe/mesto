import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }, card) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popupElement.querySelector('.popup__form')
    this._button = this._form.querySelector('.popup__button')
    this.card = card
  }

  _disableSubmitButton() {
    this._button.setAttribute('disabled', true)
  }

  close() {
    if(!this.card) {
      this._form.reset()
      this._disableSubmitButton()
    }
    super.close()
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

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      if(this.card) {
        this._handleSubmit()
      }
      else {
        this._handleSubmit(this._getInputValues())
      }
    })
  }

  renderLoading(textLoading) {
      this._popupElement.querySelector(".popup__button").textContent = textLoading
  }


}

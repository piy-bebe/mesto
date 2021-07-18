export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings
    this._buttonInactive = settings.buttonInactive
    this._form = document.querySelector(formElement)
    this._inputList = this._form.querySelectorAll(settings.inputSelector)
    this._submitButton = this._form.querySelector(settings.submitButtonSelector)
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  _setEventListeners() {
    this._toggleButtonState()

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input)

        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._buttonInactive)
      this._submitButton.setAttribute('disabled', 'disabled')
    } else {
      this._submitButton.classList.remove(this._buttonInactive)
      this._submitButton.removeAttribute('disabled')
    }
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage)
    } else {
      this._hideInputError(input)
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`)
    input.classList.add(this._settings.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._settings.errorClass)
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`)

    input.classList.remove(this._settings.inputErrorClass)
    errorElement.classList.remove(this._settings.errorClass)
    errorElement.textContent = ''
  }
}

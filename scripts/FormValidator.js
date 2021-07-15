export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings
    this._formElement = formElement
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formElement))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })

      this._setEventListeners(formElement)
    })
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._settings.inputSelector)
    )
    const buttonElement = formElement.querySelector(
      this._settings.submitButtonSelector
    )
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement)

        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_inactive')
      buttonElement.setAttribute('disabled', 'disabled')
    } else {
      buttonElement.classList.remove('popup__button_inactive')
      buttonElement.removeAttribute('disabled')
    }
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      )
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._settings.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._settings.errorClass)
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove(this._settings.inputErrorClass)
    errorElement.classList.remove(this._settings.errorClass)
    errorElement.textContent = ''
  }
}

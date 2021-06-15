const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_active')
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive')
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove('popup__button_inactive')
    buttonElement.removeAttribute("disabled");
  }
}

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)

      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = (form) => {
  const formList = Array.from(document.querySelectorAll(form.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})
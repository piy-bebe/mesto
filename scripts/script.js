import Card from './Card.js'
import FormValidator from './FormValidator.js'

const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const formProfile = new FormValidator(formSettings, '#profilePopupForm')
const formCard = new FormValidator(formSettings, '#cardPopupForm')
formProfile.enableValidation()
formCard.enableValidation()

const cardList = document.querySelector('.elements')
const profilePopup = document.querySelector('#profilePopup')
const cardPopup = document.querySelector('#cardPopup')
const popupPhoto = document.querySelector('#photoPopup')
const popupPhotoImage = document.querySelector('.popup__image')
const popupPhotoSubtitle = document.querySelector('.popup__subtitle')
const profileName = document.querySelector('.profile__name')
const profileNameInput = profilePopup.querySelector('#name-input')
const profileJob = document.querySelector('.profile__job')
const profileJobInput = profilePopup.querySelector('#job-input')
const cardNameInput = cardPopup.querySelector('#cardName-input')
const cardLinkInput = cardPopup.querySelector('#link-input')

const overlays = document.querySelectorAll('.popup')

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup()
    }
  })
})

const closeEscPopup = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

// Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeEscPopup)
}

// Удалить попап
const closePopup = (evt) => {
  document.querySelector('.popup_opened').classList.remove('popup_opened')
  document.removeEventListener('keydown', closeEscPopup)
}

// Открыть фотографию
const handlePhotoClick = (name, link) => {
  popupPhotoImage.src = link
  popupPhotoSubtitle.textContent = name
  openPopup(popupPhoto)
}

const initializeCards = (items) => {
  items.forEach((item) => {
    const card = new Card(item, '#card')
    const cardElement = card.generateCard()
    cardList.append(cardElement)
  })
}

initializeCards(initialCards)

// Попапы
const popupProfile = document.querySelector('.profile__edit-button')
const popupCard = document.querySelector('.profile__add-button')
// Кнопки для попапов
const popupButtonCloseCard = document.querySelector('#cardClose')
const popupButtonClosePhoto = document.querySelector('#photoClose')
const popupButtonCloseProfile = document.querySelector('#profileClose')
const popupButtonSave = document.querySelector('#profileSave')
const popupButtonAdd = document.querySelector('#cardAdd')

// Сохранить профиль
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  profileName.textContent = profileNameInput.value
  profileJob.textContent = profileJobInput.value
  closePopup()
}

// Добавить карточку
const handleCardFormSubmit = (evt) => {
  evt.preventDefault()
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }
  const card = new Card(data, '#card')
  const cardElement = card.generateCard()
  cardList.prepend(cardElement)
  closePopup()
}

// Обработчики событий
popupButtonCloseCard.addEventListener('click', () => closePopup())
popupButtonCloseProfile.addEventListener('click', () => closePopup())
// popupButtonClosePhoto.addEventListener('click', () => closePopup())

popupButtonAdd.addEventListener('click', handleCardFormSubmit)
popupButtonSave.addEventListener('click', handleProfileFormSubmit)

popupProfile.addEventListener('click', () => {
  openPopup(profilePopup)
  profileNameInput.value = profileName.textContent
  profileJobInput.value = profileJob.textContent
})

popupCard.addEventListener('click', () => openPopup(cardPopup))


// Список карточек
const cardList = document.querySelector('.elements')
// Попап редактирования профиля
const profilePopup = document.querySelector('#profilePopup')
// Попап добавление карточки
const cardPopup = document.querySelector('#cardPopup')
// Попап картинка
const popupPhoto = document.querySelector('#photoPopup')
const popupPhotoImage = document.querySelector('.popup__image')
const popupPhotoSubtitle = document.querySelector('.popup__subtitle')

const profileName = document.querySelector('.profile__name')
const profileNameInput = profilePopup.querySelector('#name-input')
const profileJob = document.querySelector('.profile__job')
const profileJobInput = profilePopup.querySelector('#job-input')

const cardNameInput = cardPopup.querySelector('#cardName-input')
const cardLinkInput = cardPopup.querySelector('#link-input')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

// Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup()
    }
  })
}

// Удалить попап
const closePopup = (evt) => {
  document.querySelector('.popup_opened').classList.remove('popup_opened')
}

// Обработчик лайков
const handleLikeClick = (evt) => {
  const target = evt.target.closest('.elements__like')
  if (!target) return
  target.classList.toggle('elements__like_active')
}

// Удаление
const handleTrashClick = (evt) => {
  const target = evt.target.closest('.elements__trash')
  if (!target) return
  target.closest('.elements__element').remove()
}

// Открыть фотографию
const handlePhotoClick = (name, link) => {
  popupPhotoImage.src = link
  popupPhotoSubtitle.textContent = name
  openPopup(popupPhoto)
}

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#card').content
  const cardCopy = cardTemplate
    .querySelector('.elements__element')
    .cloneNode(true)
  cardCopy.querySelector('.elements__title').textContent = name
  cardCopy.querySelector('.elements__photo').alt = name
  cardCopy.querySelector('.elements__photo').src = link

  cardCopy
    .querySelector('.elements__like')
    .addEventListener('click', handleLikeClick)
  cardCopy
    .querySelector('.elements__trash')
    .addEventListener('click', handleTrashClick)
  cardCopy
    .querySelector('.elements__photo')
    .addEventListener('click', () => handlePhotoClick(name, link))
  return cardCopy
}

const initializeCards = (cards) => {
  cards.forEach((card) => {
    cardList.append(createCard(card.name, card.link))
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
  const name = cardNameInput.value
  const link = cardLinkInput.value
  cardList.prepend(createCard(name, link))
  closePopup()
}

// Обработчики событий
popupButtonCloseCard.addEventListener('click', () => closePopup())
popupButtonCloseProfile.addEventListener('click', () => closePopup())
popupButtonClosePhoto.addEventListener('click', () => closePopup())
popupButtonAdd.addEventListener('click', handleCardFormSubmit)
popupButtonSave.addEventListener('click', handleProfileFormSubmit)
popupProfile.addEventListener('click', () => {
  openPopup(profilePopup)
  profileNameInput.value = profileName.textContent
  profileJobInput.value = profileJob.textContent
})
popupCard.addEventListener('click', () => openPopup(cardPopup))

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape' && document.querySelector('.popup_opened')) {
      closePopup()
  }
})


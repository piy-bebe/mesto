const elements = document.querySelector('.elements')
const formElement = document.querySelector('.popup__form')
// Список карточек
const cardList = document.querySelector('.elements')
// Попап редактирования профиля
const profilePopup = document.querySelector('#profilePopup')
// Попап добавление карточки
const cardPopup = document.querySelector('#cardPopup')

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
// Удалить попап
const removePopup = (evt) => {
  document.querySelector('.popup_opened').classList.remove('popup_opened')
}

const removePhoto = (evt) => {
  document
    .querySelector('.fullphoto_opened')
    .classList.remove('fullphoto_opened')
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
const handlePhotoClick = (evt) => {
  const target = evt.target.closest('.elements__photo')
  const parent = target.closest('.elements__element')
  const title = parent.querySelector('.elements__title').textContent
  document.querySelector('.fullphoto__image').src = target.src
  document.querySelector('.fullphoto__subtitle').textContent = title
  document.querySelector('.fullphoto').classList.add('fullphoto_opened')
}

const createCard = (cards) => {
  const cardList = document.querySelector('.elements')
  const cardTemplate = document.querySelector('#card').content

  cards.forEach((c) => {
    const cardCopy = cardTemplate
      .querySelector('.elements__element')
      .cloneNode(true)
    cardCopy.querySelector('.elements__title').textContent = c.name
    cardCopy.querySelector('.elements__photo').src = c.link
    cardCopy
      .querySelector('.elements__like')
      .addEventListener('click', handleLikeClick)
    cardCopy
      .querySelector('.elements__trash')
      .addEventListener('click', handleTrashClick)
    cardCopy
      .querySelector('.elements__photo')
      .addEventListener('click', handlePhotoClick)
    cardList.append(cardCopy)
  })
}

createCard(initialCards)

// Попапы
const popupProfile = document.querySelector('.profile__edit-button')
const popupCard = document.querySelector('.profile__add-button')
// Кнопки для попапов
const popupButtonCloseCard = document.querySelector('#cardClose')
const popupButtonCloseProfile = document.querySelector('#profileClose')
const popupButtonClosePhoto = document.querySelector('#photoClose')
const popupButtonSave = document.querySelector('#profileSave')
const popupButtonAdd = document.querySelector('#cardAdd')

// Открыть попап
const showPopup = (evt) => {
  const target = evt.target
  if (target.classList.contains('profile__edit-button')) {
    profilePopup.querySelector('#firstFieldProfile').value =
      document.querySelector('.profile__name').textContent
    profilePopup.querySelector('#secondFieldProfile').value =
      document.querySelector('.profile__job').textContent
    profilePopup.classList.add('popup_opened')
  } else if (target.classList.contains('profile__add-button')) {
    cardPopup.classList.add('popup_opened')
  }
}

// Сохранить профиль
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  document.querySelector('.profile__name').textContent =
    profilePopup.querySelector('#firstFieldProfile').value
  document.querySelector('.profile__job').textContent =
    profilePopup.querySelector('#secondFieldProfile').value
  removePopup()
}

// Закрыть попап
const handleCloseCard = (evt) => {
  removePopup()
}

const handleCloseProfile = (evt) => {
  removePopup()
}

const handleClosePhoto = (evt) => {
  removePhoto()
}
// Добавить карточку
const handleCardFormSubmit = (evt) => {
  evt.preventDefault()
  const cardTemplate = document.querySelector('#card').content
  const cardCopy = cardTemplate
    .querySelector('.elements__element')
    .cloneNode(true)
  const cardTitle = cardCopy.querySelector('.elements__title')
  cardTitle.textContent = cardPopup.querySelector('#firstFieldCard').value

  const cardPhoto = cardCopy.querySelector('.elements__photo')
  cardPhoto.alt = cardPopup.querySelector('#firstFieldCard').value
  cardPhoto.src = cardPopup.querySelector('#secondFieldCard').value
  cardCopy
    .querySelector('.elements__like')
    .addEventListener('click', handleLikeClick)
  cardCopy
    .querySelector('.elements__trash')
    .addEventListener('click', handleTrashClick)
  cardCopy
    .querySelector('.elements__photo')
    .addEventListener('click', handlePhotoClick)
  cardList.prepend(cardCopy)
  removePopup()
}

// Обработчики событий
popupButtonCloseCard.addEventListener('click', handleCloseCard)
popupButtonCloseProfile.addEventListener('click', handleCloseProfile)
popupButtonClosePhoto.addEventListener('click', handleClosePhoto)
popupButtonAdd.addEventListener('click', handleCardFormSubmit)
popupButtonSave.addEventListener('click', handleProfileFormSubmit)
popupProfile.addEventListener('click', showPopup)
popupCard.addEventListener('click', showPopup)

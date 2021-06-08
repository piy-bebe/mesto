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

const createCard = (cards) => {
  const cardList = document.querySelector('.elements')
  const cardTemplate = document.querySelector('#card').content

  cards.forEach((c) => {
    const cardElement = cardTemplate
      .querySelector('.elements__element')
      .cloneNode(true)
    cardElement.querySelector('.elements__title').textContent = c.name
    cardElement.querySelector('.elements__photo').src = c.link
    cardList.append(cardElement)
  })
}

createCard(initialCards)

let popup = document.querySelector('.popup')
let elements = document.querySelector('.elements')

let firstField = popup.querySelector('#firstField')
let secondField = popup.querySelector('#secondField')

let editButton = document.querySelector('.profile__edit-button')
let addButton = document.querySelector('.profile__add-button')
let closeButton = document.querySelector('.popup__close')

let formElement = document.querySelector('.popup__form')

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

let idButton

const submitForm = (evt) => {
  evt.preventDefault()
  switch (idButton) {
    case 'add':
      const cardTemplate = document.querySelector('#card').content
      const cardElement = cardTemplate
        .querySelector('.elements__element')
        .cloneNode(true)
      cardElement.querySelector('.elements__title').textContent =
        firstField.value
      cardElement.querySelector('.elements__photo').src = secondField.value
      const cardList = document.querySelector('.elements')
      if (cardList.length) {
        const firstCard = document.querySelectorAll('.elements__element')[0]
        const parentDiv = firstCard.parentNode
        parentDiv.insertBefore(cardElement, firstCard)
      } else {
        document.querySelector('.elements').appendChild(cardElement)
      }
      break
    case 'edit':
      profileName.textContent = firstField.value
      profileJob.textContent = secondField.value
      break
  }
  popup.classList.remove('popup_opened')
}

const togglePopup = (evt) => {
  popup.classList.toggle('popup_opened')
  const popupTitle = popup.querySelector('.popup__title')
  const popupSubmit = popup.querySelector('.popup__submit')

  if (popup.classList.contains('popup_opened')) {
    const clickButton = evt.target
    const classButton = Array.from(clickButton.classList)
    const typeButton = classButton.find(
      (btn) =>
        btn.includes('profile__add-button') ||
        btn.includes('profile__edit-button')
    )

    switch (typeButton) {
      case 'profile__add-button':
        firstField.value = ''
        secondField.value = ''
        popupTitle.textContent = 'Новое место'
        popupSubmit.textContent = 'Создать'

        firstField.placeholder = 'Название'
        secondField.placeholder = 'Ссылка на картинку'

        idButton = 'add'
        break
      case 'profile__edit-button':
        popupTitle.textContent = 'Редактировать профиль'
        popupSubmit.textContent = 'Сохранить'

        firstField.placeholder = 'Имя'
        secondField.placeholder = 'Занятие'
        firstField.value = profileName.textContent
        secondField.value = profileJob.textContent

        idButton = 'edit'
        break
    }
  }
}

editButton.addEventListener('click', togglePopup)
addButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)
formElement.addEventListener('submit', submitForm)

elements.addEventListener('click', (e) => {
  const target = e.target.closest('.elements__like')
  if (!target) return
  target.classList.toggle('elements__like_active')
})

elements.addEventListener('click', (e) => {
  const target = e.target.closest('.elements__trash')
  if (!target) {
    return
  }
  target.parentNode.remove()
})

elements.addEventListener('click', (e) => {
  const target = e.target.closest('.elements__photo')
  if (!target) {
    return
  }
  const card = e.target.parentNode
  const textTitle = card.querySelector('.elements__title')
  const fullPhotoTemplate = document.querySelector('#photo').content
  const photoElement = fullPhotoTemplate
    .querySelector('.fullphoto')
    .cloneNode(true)
  photoElement.querySelector('.fullphoto__image').src = target.src
  photoElement.querySelector('.fullphoto__subtitle').textContent =
    textTitle.textContent
  const body = document.querySelector('.page')
  body.append(photoElement)
})

const page = document.querySelector('.page')
page.addEventListener('click', (e) => {
  const target = e.target.closest('.fullphoto__close')
  if (!target) return
  document.querySelector('.fullphoto').remove()
})

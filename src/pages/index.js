import './index.css'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { initialCards, formSettings, cardList, profileAddButton, profileEditButton, nameInputId, jobInputId } from '../utils/constants.js'

const editProfileValidator = new FormValidator(
  formSettings,
  '#profilePopupForm'
)
const addCardValidator = new FormValidator(formSettings, '#cardPopupForm')
editProfileValidator.enableValidation()
addCardValidator.enableValidation()

// Функция создания карточки
function createCard({ name, link }, handleCardClick) {
  const card = new Card({ name, link }, handleCardClick)
  const cardElement = card.generateCard()

  return cardElement
}

const popupImage = new PopupWithImage('#photoPopup')

const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__job',
})

// Список карточек
const itemsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard({ name: item.name, link: item.link }, () => {
        popupImage.open({ src: item.link, title: item.name })
      })
      itemsList.addItem(card)
    },
  },
  cardList
)

const popupAddCard = new PopupWithForm({
  popupSelector: '#cardPopup',
  handleSubmit: (data) => {
    const card = createCard(
      {
        name: data['cardName-input'],
        link: data['link-input'],
      },
      () => {
        popupImage.open({ src: item.link, title: item.name })
      }
    )
    itemsList.addItem(card)
  },
})

const popupEditProfile = new PopupWithForm({
  popupSelector: '#profilePopup',
  handleSubmit: (data) => {
    userInfo.setUserInfo({ name: data['name-input'], info: data['job-input'] })
  },
})

popupEditProfile.setEventListeners()
popupImage.setEventListeners()
popupAddCard.setEventListeners()
itemsList.renderItems()

profileAddButton.addEventListener('click', () => {
  popupAddCard.open()
})

profileEditButton.addEventListener('click', () => {
  nameInputId.value = userInfo.getUserInfo().name
  jobInputId.value = userInfo.getUserInfo().info
  popupEditProfile.open()
})

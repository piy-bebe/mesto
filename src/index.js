import './pages/index.css'

import Card from './components/Card.js'
import Section from './components/Section.js'
import FormValidator from './components/FormValidator.js'
import PopupWithImage from './components/PopupWithImage.js'
import PopupWithForm from './components/PopupWithForm.js'
import UserInfo from './components/UserInfo.js'
import { initialCards, formSettings, cardList } from './utils/constants.js'

const editProfileValidator = new FormValidator(formSettings, '#profilePopupForm')
const addCardValidator = new FormValidator(formSettings, '#cardPopupForm')
editProfileValidator.enableValidation()
addCardValidator.enableValidation()

// Функция создания карточки
function createCard({name, link}) {
  const card = new Card(
    { name, link, cardSelector: '#card' },
  )
  const cardElement = card.generateCard()

  return cardElement
}

const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__job',
})

const popupImage = new PopupWithImage({
  popup: '#photoPopup',
  src: item.link,
  title: item.name,
})
// Список карточек
const itemsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard({name: item.name, link: item.link})
      itemsList.addItem(card)
    },
  },
  cardList
)

const popupAddCard = new PopupWithForm({
  popup: '#cardPopup',
  button: '.profile__add-button',
  handleSubmit: (data) => {
    const cardPopup = new PopupWithImage({
      popup: '#photoPopup',
      src: data['link-input'],
      title: data['cardName-input'],
    })

    const card = createCard({ name: data['cardName-input'], data['link-input'] })
    itemsList.addItem(card)
  },
})

const popupEditProfile = new PopupWithForm({
  popup: '#profilePopup',
  button: '.profile__edit-button',
  handleSubmit: (data) => {
    userInfo.setUserInfo({ name: data['name-input'], info: data['job-input'] })
  },
})

popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
itemsList.renderItems()
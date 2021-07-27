import Card from './Card.js'
import Section from './Section.js'
import FormValidator from './FormValidator.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import { initialCards, formSettings, cardList } from './constants.js'

const formProfile = new FormValidator(formSettings, '#profilePopupForm')
const formCard = new FormValidator(formSettings, '#cardPopupForm')
formProfile.enableValidation()
formCard.enableValidation()

// Список карточек
const itemsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardPopup = new PopupWithImage({
        popup: '#photoPopup',
        src: item.link,
        title: item.name,
      })
      const card = new Card(
        { name: item.name, link: item.link, cardSelector: '#card' },
        cardPopup.open.bind(cardPopup),
        cardPopup.close.bind(cardPopup)
      )
      const cardElement = card.generateCard()
      itemsList.addItem(cardElement)
    },
  },
  cardList
)

const cardPopup = new PopupWithForm({
  popup: '#cardPopup',
  button: '.profile__add-button',
  handleSubmit: (data) => {
    const cardPopup = new PopupWithImage({
      popup: '#photoPopup',
      src: data['link-input'],
      title: data['cardName-input'],
    })
    const card = new Card(
      {
        name: data['cardName-input'],
        link: data['link-input'],
        cardSelector: '#card',
      },
      cardPopup.open.bind(cardPopup),
      cardPopup.close.bind(cardPopup)
    )
    const cardElement = card.generateCard()
    itemsList.addItem(cardElement)
  },
})

const profilePopup = new PopupWithForm({
  popup: '#profilePopup',
  button: '.profile__edit-button',
  handleSubmit: (data) => {
    const userInfo = new UserInfo({
      name: '.profile__name',
      info: '.profile__job',
    })

    userInfo.setUserInfo({ name: data['name-input'], info: data['job-input'] })
  },
})

profilePopup.setEventListeners()
cardPopup.setEventListeners()
itemsList.renderItems()

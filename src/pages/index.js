import "./index.css";

import Api from "../components/Api";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  formSettings,
  cardList,
  profileAddButton,
  profileEditButton,
  nameInputId,
  jobInputId,
} from "../utils/constants.js";

const editProfileValidator = new FormValidator(
  formSettings,
  "#profilePopupForm"
);
const addCardValidator = new FormValidator(formSettings, "#cardPopupForm");
editProfileValidator.enableValidation();
addCardValidator.enableValidation();


const popupImage = new PopupWithImage("#photoPopup");

const userInfo = new UserInfo({
  name: ".profile__name",
  info: ".profile__job",
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-28",
  headers: {
    authorization: "d781fe4a-f4fe-41ed-aa26-c8157cbe42f0",
    "Content-Type": "application/json",
  },
});

// Загрузка информации о пользователе с сервера
api.getUser().then((data) => {
  document.querySelector(".profile__name").textContent = data.name;
  document.querySelector(".profile__job").textContent = data.about;
  document.querySelector(".profile__avatar").src = data.avatar;
});

// Функция создания карточки
function createCard({ name, link, likes, ownerId }, handleCardClick, handleCardDelete) {
  const card = new Card(
    { name, link, likes, ownerId },
    handleCardClick,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
}

// Попап удаление карточки
const popupDeleteCard = new PopupWithForm({
  popupSelector: "#deleteCard",
  handleSubmit: () => {
    popupDeleteCard.card.remove()
  },
});

// Загрузка карточек с сервера
api.getInitialsCards().then((data) => {
  const itemsList = new Section(
    {
      items: data,
      renderer: (item) => {
        const card = createCard(
          { name: item.name, link: item.link, likes: item.likes.length, ownerId: item.owner._id },
          () => {
            popupImage.open({ src: item.link, title: item.name });
          },
          (card) => {
            popupDeleteCard.open();
            popupDeleteCard.card = card;
          }
        );
        itemsList.addItem(card);
      },
    },
    cardList
  );
  itemsList.renderItems();
});

// Список карточек

const popupAddCard = new PopupWithForm({
  popupSelector: "#cardPopup",
  handleSubmit: (data) => {
    const card = createCard(
      {
        name: data["cardName-input"],
        link: data["link-input"],
        likes: 0,
        ownerId: "8dceed107174cd6abf1932ff"
      },
      () => {
        popupImage.open({ src: data["link-input"], title: data["cardName-input"] });
      },
      (card) => {
        popupDeleteCard.open();
        popupDeleteCard.card = card;
      }
    );
    api.setCard({ name: data["cardName-input"], link: data["link-input"] });
    document.querySelector(cardList).append(card);
  },
});

// Редактирование профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: "#profilePopup",
  handleSubmit: (data) => {
    api.setUser({ name: data["name-input"], about: data["job-input"] });
    userInfo.setUserInfo({ name: data["name-input"], info: data["job-input"] });
  },
});

popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
});

profileEditButton.addEventListener("click", () => {
  nameInputId.value = userInfo.getUserInfo().name;
  jobInputId.value = userInfo.getUserInfo().info;

  popupEditProfile.open();
});

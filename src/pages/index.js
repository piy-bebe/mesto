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
  profileAvatar,
  templateCard
} from "../utils/constants.js";

const editProfileValidator = new FormValidator(
  formSettings,
  "#profilePopupForm"
);
const addCardValidator = new FormValidator(formSettings, "#cardPopupForm");
const editAvatarValidator = new FormValidator(formSettings, "#editAvatarForm");

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

const popupImage = new PopupWithImage("#photoPopup");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-28",
  headers: {
    authorization: "d781fe4a-f4fe-41ed-aa26-c8157cbe42f0",
    "Content-Type": "application/json",
  },
});

// Массив промисов для Promise.all
const promises = [api.getUser(), api.getInitialsCards()];

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__avatar",
});

const itemsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      itemsList.addItem(card);
    },
  },
  cardList
);

Promise.all(promises).then((data) => {
  // Получаем информацию о пользователе
  const user = data[0];

  // Устанавливаем id пользователя
  userInfo.setUserId(user._id);

  // Подгружаем пользователя
  userInfo.setUserInfo({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });

  // Получаем карточки
  const cards = data[1];

  // Добавляем карточки на страницу
  itemsList.renderItems(cards);
});

// Функция создания карточки
function createCard(item) {
  item.like =
    item.likes.find((like) => {
      if (like._id === userInfo.getUserInfo().id) return true;
    }) || false;

  const card = new Card(
    {
      name: item.name,
      link: item.link,
      likes: item.likes.length,
      ownerId: item.owner._id,
      cardId: item._id,
      isLike: item.like,
      userId: userInfo.getUserInfo().id
    },
    () => {
      popupImage.open({ src: item.link, title: item.name });
    },
    (card, id) => {
      popupDeleteCard.open();
      popupDeleteCard.card = card;
      popupDeleteCard.id = id;
    },
    (evt, id, like, card) => {
      const target = evt.target.closest(".elements__like");
      const likeCount = evt.currentTarget.querySelector(".elements__count");
      if (!target) return;

      target.classList.toggle("elements__like_active");

      like
        ? api.unLike(id).then((data) => {
            card.setLike()
            likeCount.textContent = data.likes.length;
          })
        : api.like(id).then((data) => {
            likeCount.textContent = data.likes.length;
            card.setLike()
          })
    },
    templateCard
  );
  const cardElement = card.generateCard();

  return cardElement;
}

// Редактируем аватар
const popupEditAvatar = new PopupWithForm({
  popupSelector: "#editAvatar",
  handleSubmit: (src) => {
    popupEditAvatar.renderLoading("Сохраняем...");
    api
      .setAvatar(src.avatarSrc)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderLoading("Сохранить");
      });
  },
});

// Попап удаление карточки
const popupDeleteCard = new PopupWithForm({
  popupSelector: "#deleteCard",
  handleSubmit: () => {
    popupDeleteCard.renderLoading("Удаление...");
    api
      .deleteCard(popupDeleteCard.id)
      .then((res) => {
        popupDeleteCard.card.remove();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteCard.renderLoading("Да");
      });
  },
});

// Попап добавления карточек
const popupAddCard = new PopupWithForm({
  popupSelector: "#cardPopup",
  handleSubmit: (data) => {
    popupAddCard.renderLoading("Создаем...");
    api
      .setCard({ name: data["cardName-input"], link: data["link-input"] })
      .then((card) => {
        itemsList.addItem(createCard(card));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading("Создать");
      });
  },
});

// Редактирование профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: "#profilePopup",
  handleSubmit: (data) => {
    document
      .querySelector("#profilePopup")
      .querySelector(".popup__button").textContent += "...";
    api
      .setUser({ name: data["name-input"], about: data["job-input"] })
      .then((res) => {
        if (res.ok) {
          userInfo.setUserInfo({
            name: data["name-input"],
            about: data["job-input"],
          });
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        document
          .querySelector("#profilePopup")
          .querySelector(".popup__button").textContent = "Сохранить";
        popupEditProfile.close();
      });
  },
});

popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();

profileAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation()
  popupAddCard.open();
});

profileEditButton.addEventListener("click", () => {
  nameInputId.value = userInfo.getUserInfo().name;
  jobInputId.value = userInfo.getUserInfo().about;

  popupEditProfile.open();
});

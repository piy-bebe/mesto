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
  profileAvatar
} from "../utils/constants.js";

const editProfileValidator = new FormValidator(
  formSettings,
  "#profilePopupForm"
);
const addCardValidator = new FormValidator(formSettings, "#cardPopupForm");
const editAvatarValidator = new FormValidator(formSettings, "#editAvatarForm")

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();


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
function createCard({ name, link, likes, ownerId, cardId, isLike }, handleCardClick, handleCardDelete, handleCardLike) {
  const card = new Card(
    { name, link, likes, ownerId, cardId, isLike },
    handleCardClick,
    handleCardDelete,
    handleCardLike
  );
  const cardElement = card.generateCard();

  return cardElement;
}

const popupEditAvatar = new PopupWithForm({
  popupSelector: "#editAvatar",
  handleSubmit: () => {
    alert('123')
  }
})



// Попап удаление карточки
const popupDeleteCard = new PopupWithForm({
  popupSelector: "#deleteCard",
  handleSubmit: () => {
    popupDeleteCard.card.remove()
    api.deleteCard(popupDeleteCard.id)
  },
});

// Загрузка карточек с сервера
api.getInitialsCards().then((data) => {
  
  const itemsList = new Section(
    {
      items: data,
      renderer: (item) => {

        const isLike = item.likes.find(like =>  {
          if(like._id === '8dceed107174cd6abf1932ff') return true
        }) || false
        console.log(isLike)

        const card = createCard(
          { name: item.name, link: item.link, likes: item.likes.length, ownerId: item.owner._id, cardId: item._id, isLike: isLike },
          () => {
            popupImage.open({ src: item.link, title: item.name });
          },
          (card, id) => {
            popupDeleteCard.open();
            popupDeleteCard.card = card;
            popupDeleteCard.id = id;
          }, (evt, id) => {
            const target = evt.target.closest('.elements__like')
            const likeCount = evt.currentTarget.querySelector('.elements__count')
            if (!target) return
            
            target.classList.toggle('elements__like_active')
            
            
            api.getMe().then(res => res.json()).then(user => {
              api.getCard(id).then(res => res.json()).then(data => {
                data.forEach(card => {
                  if(card._id === id) {

                    const countLikes = card.likes.length
                    if(card.likes.length === 0) {
                      likeCount.textContent = countLikes + 1
                      api.like(card._id)
                    }

                    card.likes.forEach(like => {
                      if(like._id === user._id) {

                        likeCount.textContent = countLikes - 1
                        api.unLike(card._id)
                      } else {
                        likeCount.textContent = countLikes + 1
                        api.like(card._id)
                      }
                    })
                  }
                })
  
              })
            })


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
    const alelel = api.setCard({ name: data["cardName-input"], link: data["link-input"] });
    alelel.then(res => {
      const card = createCard(
        {
          name: res.name,
          link: res.link,
          likes: res.likes.length,
          ownerId: res.owner._id,
          cardId: res._id
        },
        () => {
          popupImage.open({ src: res.link, title: res.name });
        },
        (card, id) => {
          popupDeleteCard.open();
          popupDeleteCard.card = card;
          popupDeleteCard.id = id;
        }, (evt, id) => {
          const target = evt.target.closest('.elements__like')
          const likeCount = evt.currentTarget.querySelector('.elements__count')
          if (!target) return
          
          target.classList.toggle('elements__like_active')
          
          
          api.getMe().then(res => res.json()).then(user => {
            api.getCard(id).then(res => res.json()).then(data => {
              data.forEach(card => {
                if(card._id === id) {

                  const countLikes = card.likes.length
                  if(card.likes.length === 0) {
                    likeCount.textContent = countLikes + 1
                    api.like(card._id)
                  }

                  card.likes.forEach(like => {
                    if(like._id === user._id) {

                      likeCount.textContent = countLikes - 1
                      api.unLike(card._id)
                    } else {
                      likeCount.textContent = countLikes + 1
                      api.like(card._id)
                    }
                  })
                }
              })

            })
          })


        }
      );
      document.querySelector(cardList).append(card);
    })

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
popupEditAvatar.setEventListeners();


profileAvatar.addEventListener("click", () => {
  popupEditAvatar.open()
})

profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
});

profileEditButton.addEventListener("click", () => {
  nameInputId.value = userInfo.getUserInfo().name;
  jobInputId.value = userInfo.getUserInfo().info;

  popupEditProfile.open();
});

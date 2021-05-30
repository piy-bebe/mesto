let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let fieldName = popup.querySelector('#fieldName');
let fieldJob = popup.querySelector('#fieldJob');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = fieldName.value;
  profileJob.textContent = fieldJob.value;
  popup.classList.remove('popup_opened')
}

function togglePopup() {
  popup.classList.toggle('popup_opened');

  if(popup.classList.contains('popup_opened')) {
    fieldName.value = profileName.textContent;
    fieldJob.value = profileJob.textContent;
  }
}


editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
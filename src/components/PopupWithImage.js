import Popup from './Popup.js'

const popupPhotoImage = document.querySelector('.popup__image')
const popupPhotoSubtitle = document.querySelector('.popup__subtitle')

export default class PopupWithImage extends Popup {
  constructor({ popup, src, title }) {
    console.log(popup)
    super(popup)
    this._src = src
    this._title = title
  }

  open() {
    popupPhotoImage.src = this._src
    popupPhotoSubtitle.textContent = this._title
    super.open()
    // super.setEventListeners()
  }
}

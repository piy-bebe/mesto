import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupPhotoImage = this._popupElement.querySelector('.popup__image')
    this._popupPhotoSubtitle =
      this._popupElement.querySelector('.popup__subtitle')
  }

  open({ src, title }) {
    this._popupPhotoImage.src = src
    this._popupPhotoSubtitle.textContent = title
    super.open()
  }
}

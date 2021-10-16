export default class UserInfo {
  constructor({ name, about, avatar}) {
    this._name = document.querySelector(name)
    this._about = document.querySelector(about)
    this._avatar = document.querySelector(avatar)
    this._id = 0
  }

  setUserId(id) {
    this._id = id
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.src = avatar
  }
}

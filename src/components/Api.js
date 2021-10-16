export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  getInitialsCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse)
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse)
  }

  setUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse)
  }

  setCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      })
    }).then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType,
      }
    }).then(this._checkResponse)
  }

  like(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType,
      }
    }).then(this._checkResponse)
  }

  unLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`,  {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    }).then(this._checkResponse)
  }

  getCard(id) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkResponse)
  }
}

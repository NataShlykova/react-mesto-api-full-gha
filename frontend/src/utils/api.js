class Api {
  constructor(options) {
    this._options = options;
    this._url = this._options.url
    this._headers = this._options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  getUserInfo(jwt) {
    return this._request(this._url + '/users/me', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',

      }
    })
  }

  getInitialCards(jwt) {
    return this._request(this._url + '/cards', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': "application/json",
      }
    })
  }

 setUserInfoApi(userData, jwt) {
    return this._request(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userData.name}`,
        about: `${userData.about}`
      })
    });
  }

  addUserCard(cardData, jwt) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    });
  }

  changeLikeCardStatus(id, isLiked, jwt) { 
    return this._request(this._url + `/cards/${id}/likes`, { 
      method: `${isLiked ? 'PUT' : 'DELETE'}`, 
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
  }

  delete(id, jwt) {
    return this._request(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
  }

  handleUserAvatar(userData, jwt) {
    return this._request(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: userData.avatar,
      })
    });
  }

  getAllNeededData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }
}

const api = new Api({
  url: 'api.domainname.mesto.nomoredomainsicu.ru',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
})

export { api }

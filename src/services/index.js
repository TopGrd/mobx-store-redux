class Service {
  getBooks() {
    return fetch('/list.json').then(res => res.json())
  }
}

export default new Service()

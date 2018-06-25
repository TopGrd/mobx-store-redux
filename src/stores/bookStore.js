import { types, flow } from 'mobx-state-tree'
import service from '../services'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants'

export const Book = types
  .model('Book', {
    name: types.string,
    img: types.optional(types.string, ''),
    price: types.number,
  })
  .actions(self => ({
    changePrice(newPrice) {
      self.price = newPrice
    },
  }))

export const BookStore = types
  .model('BookStore', {
    list: types.optional(types.array(Book), []),
    cart: types.optional(types.array(Book), []),
  })
  .actions(self => ({
    afterCreate() {
      self.fetchBookList()
    },

    fetchBookList: flow(function*() {
      try {
        const data = yield service.getBooks()
        self.list = data
      } catch (err) {
        console.log(err)
      }
    }),

    [ADD_TO_CART]({ book }) {
      let item = self.cart.find(item => item.name === book.name)
      if (item) {
        return item
      }

      item = Object.assign({}, book)
      console.log(self.cart)
      self.cart.push(item)
      return item
    },

    [REMOVE_FROM_CART]({ book }) {
      const item = self.cart.find(item => item.name === book.name)
      self.cart.remove(item)
    },
  }))

import * as types from '../constants'

export const addToCart = item => ({ type: types.ADD_TO_CART, book: item })

export const removeFromCart = item => ({ type: types.REMOVE_FROM_CART, book: item })

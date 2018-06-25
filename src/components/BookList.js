import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BookItem from './BookItem'
import * as BookActions from '../actions'

const BookList = ({ list, cart, actions, isShopping, totalPrice }) => {
  return (
    <div>
      <div className="book-list">
        <h3>书店</h3>
        <ul>
          {list.map((item, idx) => (
            <BookItem
              type="shop"
              method={() => actions.addToCart(item)}
              item={item}
              key={idx}
            />
          ))}
        </ul>
      </div>
      {isShopping ? (
        <div className="book-list">
          <h3>购物车</h3>
          <ul>
            {cart.map((item, idx) => (
              <BookItem
                type="cart"
                method={() => actions.removeFromCart(item)}
                item={item}
                key={idx}
              />
            ))}
          </ul>
          <p>总计：{totalPrice}</p>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = ({ list, cart }) => {
  return {
    list: list,
    cart: cart,
    totalPrice: cart.reduce((prev, cur) => (prev += cur.price), 0),

    isShopping: cart.length > 0,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(BookActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)

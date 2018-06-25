import React from 'react'
import { observer } from 'mobx-react'

const BookItem = ({ item, type, method }) => (
  <li className="book-item">
    <img src={item.img} alt="" />
    <h3>{item.name}</h3>

    <div className="util">
      <p>¥：{item.price}</p>
      <button onClick={() => method(item)}>{type === 'shop' ? '+' : '-'}</button>
    </div>
  </li>
)

export default observer(BookItem)

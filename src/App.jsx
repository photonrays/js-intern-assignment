// import { useState } from 'react'
import './App.css'
import * as data from './data/shoes.json';
import { useEffect, useState } from 'react';
import { minus, nike, plus, trash, wave, check, blob } from "./assets/index"


function App() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartItem')) || [])

  const addToCart = (shoe) => {
    if (cart.findIndex(item => item.id == shoe.id) == -1) setCart(prev => [...prev, { ...shoe, amount: 1 }])
  }

  const decrement = (id) => {
    setCart(prev => {
      const newCart = prev.map(e => ({ ...e }));
      const itemIndex = newCart.findIndex(item => item.id == id)
      if (itemIndex !== -1) {
        if (newCart[itemIndex].amount == 1) {
          newCart.splice(itemIndex, 1)
        }
        else newCart[itemIndex].amount = newCart[itemIndex].amount - 1;
      }
      return newCart
    })
  }
  const increment = (id) => {
    setCart(prev => {
      const newCart = prev.map(e => ({ ...e }));
      const itemIndex = newCart.findIndex(item => item.id == id)
      if (itemIndex !== -1) {
        newCart[itemIndex].amount = newCart[itemIndex].amount + 1;
      }
      return newCart
    })
  }

  const deleteItem = (id) => {
    const itemElement = document.getElementById(id);
    if (itemElement) {
      itemElement.classList.add('removing');
      setTimeout(() => {
        setCart(prev => prev.filter(item => item.id != id))
        itemElement.classList.remove('removing');
      }, 600)
    }
  }

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(Math.round(newTotal * 100) / 100)
    localStorage.setItem('cartItem', JSON.stringify(cart))
  }, [cart])

  return (
    <div className='container'>
      <img src={wave} alt="My SVG" className='background-object' />
      <div className='content'>

        {/* product section */}
        <section>
          <img src={nike} alt="logo" className='logo' />
          <img src={blob} alt="blob" className='blob' />
          <h2 className='title'>Our products</h2>
          <div className='product-container'>
            {data.shoes.map((shoe, index) => {
              return <div key={index}>
                <div className='product-image' style={{ backgroundColor: shoe.color }}>
                  <img src={shoe.image} />
                </div>
                <p className='product-name'>{shoe.name}</p>
                <p className='product-desc'>{shoe.description}</p>
                <div className='checkout'>
                  <p>${shoe.price}</p>
                  <button className={`add-product-button ${cart.findIndex(item => item.id == shoe.id) == -1 ? '' : 'checked'}`} onClick={() => addToCart(shoe)}>
                    {cart.findIndex(item => item.id == shoe.id) == -1 ? <span style={{ fontWeight: "bold" }}>ADD TO CART</span> : <img src={check} />}</button>
                </div>
              </div>
            })}
          </div>
        </section >


        {/* cart section */}
        <section>
          <img src={nike} alt="logo" className='logo' />
          <img src={blob} alt="blob" className='blob' />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className='title'>Your cart</h2>
            <p className='title'>${total}</p>
          </div>
          <div className='cart-container'>
            {cart.length == 0 ? <div>Your cart is empty.</div> : cart.map((c, index) => {
              return <div key={index} className='cart-item' id={c.id}>
                <div className='image-container' style={{ backgroundColor: c.color }}>
                  <img src={c.image} alt='shoe' />
                </div>
                <div className='cart-item-detail'>
                  <p className='cart-item-name'>{c.name}</p>
                  <p className='cart-item-price'>${c.price}</p>
                  <div className='cart-checkout'>
                    <div className='cart-item-counter'>
                      <button onClick={() => decrement(c.id)}>
                        <img src={minus} />
                      </button>
                      <span>{c.amount}</span>
                      <button onClick={() => increment(c.id)}>
                        <img src={plus} />
                      </button>
                    </div>
                    <button className='cart-item-delete' onClick={() => deleteItem(c.id)}>
                      <img src={trash} />
                    </button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </section>
      </div>
    </div >
  )
}

export default App

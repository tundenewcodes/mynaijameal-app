import React, { useContext, useState } from 'react'
import styles from '../../styles/Cart.module.css'
import Modal from '../UI/Modal'
import FoodContext from '../Store/FoodContext'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState( false )
  const [didSubmit, setDidSubmit] = useState(false)
  const foodCtx = useContext(FoodContext)
  const totalAmount = `₦${foodCtx.totalAmount.toFixed(2)}`
  const hasitems = foodCtx.foodItems.length > 0
  const addFoodHandler = (items) => {
    foodCtx.addItem({...items, amount : 1})
  }
  const removeFoodHandler = (id)=>{foodCtx.removeItem(id)}
  const cartItems = (
    <ul className={styles['cart-items']}>
      {foodCtx.foodItems.map((food) => {
        return (
          <CartItem
            key={food.id}
            id = {food.id}
            name={food.name}
            price={food.price}
            amount={food.amount}
            onRemove={removeFoodHandler.bind(null, food.id)}
            onAdd ={addFoodHandler.bind(null, food)}
          />
        )
      })}
    </ul>
  )

  const checkoutHandler = () => {
    setIsCheckout(true)
  }

  const onConfirmHandler = async( userData ) => {
   setIsSubmitting(true)
  await fetch(
     'https://fooduu-46c9b-default-rtdb.firebaseio.com/orders.json', {
       method: 'POST',
       body: JSON.stringify( {
         userData: userData,
         orderItems  : foodCtx.foodItems
       })
     }
    )
    setIsSubmitting( false )
    setDidSubmit( true )
    foodCtx.clearItem()
 }

  const modalActions = <div className={styles.actions}>
          <button
            className={styles['button--alt']}
            onClick={props.close}>
            close
          </button>
          {hasitems && (
            <button className={styles.button} onClick={checkoutHandler}>
              open
            </button>
          )}
  </div>
  const cartModalContent = (
    <React.Fragment>
      {' '}
      <div>{cartItems}</div>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.close}
          onConfirm={onConfirmHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  )
  const contentIsSubmitting = <p>submitting content.....</p>
  const dataSubmitted = (
    <React.Fragment>
      <p>data has been successfully submitted</p>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={props.close}>
          close
        </button>
      
      </div>
    </React.Fragment>
  )
  return (
    <Modal close={props.close}  >
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && contentIsSubmitting}
     {didSubmit && dataSubmitted}  
     
    </Modal>
  )
}

export default Cart

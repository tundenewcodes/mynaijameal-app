import React,{useContext} from 'react'
import styles from '../../styles/MealItem.module.css'
import MealItemForm from './MealItemForm'
import FoodContext from '../Store/FoodContext'
const MealItem = ( props ) => {
  const foodCtx = useContext(FoodContext)
  const price = `₦${ props.price.toFixed( 2 ) }`

  const onAddToCartHandler = ( amount ) => {
    foodCtx.addItem( {
      name: props.name,
      price: props.price,
      id: props.id,
      amount : amount
    })
  }
  return (
    <l1 className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
          </div>
          <div><MealItemForm addToCart ={onAddToCartHandler}/></div>
    </l1>
  )
}

export default MealItem
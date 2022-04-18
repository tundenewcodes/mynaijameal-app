import React,{useContext, useState, useEffect} from 'react'
import CartIcon from './CartIcon'
import styles from '../../styles/HeaderCartButton.module.css'
import FoodContext from '../Store/FoodContext'

const HeaderCartButton = (props) => {
  const [ btnBump, setBtnBump ] = useState( false )
  const foodCtx = useContext( FoodContext )
  const {foodItems} = foodCtx
  const numberofCartitems = foodItems.reduce( ( currEl, foodItem ) => {
    return currEl + foodItem.amount
  }, 0 )
  const bumpStyles = `${styles.button}  ${btnBump ? styles.bump : ''}`
  useEffect( () => {
    if ( foodItems.length === 0 ) {
     return 
    } 
      setBtnBump(true)
    const timer = setTimeout( () => { setBtnBump( false ) }, 300 )
    return () => {
      clearTimeout(timer)
    }
  },[foodItems])
  
  return (
      <button className={bumpStyles} onClick={props.open}>
          <span className={styles.icon}><CartIcon/></span>
          <span>your order</span>
          <span className={styles.badge}>{numberofCartitems}</span>
    </button>
  )
}

export default HeaderCartButton
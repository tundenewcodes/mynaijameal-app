import React,{useRef, useState} from 'react'
import styles from '../../styles/MealItemForm.module.css'
import Input from '../UI/Input'

const MealItemForm = (props) => {
  const [inputIsValid, setInputisValid] = useState(true)
  const inputRef = useRef()
  const submitHandler = ( event ) => {
    event.preventDefault()
    const enteredInput = inputRef.current.value
    const enteredInputNumber = +enteredInput
    if ( enteredInput.trim().length === 0 || enteredInputNumber < 1 || enteredInputNumber > 5 ) {
     setInputisValid(false)
      return
    }
props.addToCart(enteredInputNumber)
  }
  return (
    <form className={styles.form}>
      <Input
       ref ={inputRef} label='Amount'
        input={{
              type: 'number',
              max: '5',
              min: '1',
              id: 'Amount',
              step : '1',
              defaultValue : '1'
      }} />
      <button  onClick={submitHandler}> +add</button>
      {!inputIsValid && <p>enter amount (number between 1 - 5)</p>}
    </form>
  )
}

export default MealItemForm

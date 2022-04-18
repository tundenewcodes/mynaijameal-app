import classes from '../../styles/Checkout.module.css'
import { useRef, useState } from 'react'
const isValid = value => value.trim() !== ''
const hasFiveChars = value => value.trim().length >= 5 
const Checkout = ( props ) => {
  const [ formInputValidity, setInputFormValidity ] = useState( {
    name: true,
    city: true,
    postal: true,
    street : true
  })
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

const enteredNameIsValid = isValid(enteredName)
const enteredStreetIsValid = isValid(enteredStreet)
const enteredPostalIsValid = hasFiveChars(enteredPostal)
    const enteredCityIsValid = isValid( enteredCity )

    setInputFormValidity( {
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city : enteredCityIsValid
    })
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid
    
    if ( !formIsValid ) {
  return
    }
    props.onConfirm( {
      name  : enteredName,
      city: enteredCity,
      street: enteredStreet,
      postal : enteredPostal
    })
  }
const nameClassesControl = `${classes.control} ${
          formInputValidity.name ? '' : classes.invalid
        }`
const streetClassesControl = `${classes.control} ${
          formInputValidity.street ? '' : classes.invalid
        }`
const cityClassesControl = `${classes.control} ${
          formInputValidity.city ? '' : classes.invalid
        }`
const postalClassesControl = `${classes.control} ${
          formInputValidity.postal ? '' : classes.invalid
        }`
  return (
    <div style={{ display: 'flex', overflow : 'scroll' }}>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameClassesControl}>
          <label htmlFor='name'> Your Name </label>{' '}
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputValidity.name && (
            <p>please enter a valid name</p>
          )}
        </div>{' '}
        <div
          className={streetClassesControl}>
          <label htmlFor='street'> Street </label>{' '}
          <input type='text' id='street' ref={streetInputRef} />
          {!formInputValidity.street && (
            <p>please enter a valid street</p>
          )}
        </div>{' '}
        <div
          className={postalClassesControl}>
          <label htmlFor='postal'> Postal Code </label>{' '}
          <input type='text' id='postal' ref={postalInputRef} />
          {!formInputValidity.postal && (
            <p>
              please enter a valid postal code (5 characters long)
            </p>
          )}
        </div>{' '}
        <div
          className={cityClassesControl}>
          <label htmlFor='city'> City </label>{' '}
          <input type='text' id='city' ref={cityInputRef} />
          {!formInputValidity.city && (
            <p>please enter a valid city</p>
          )}
        </div>
      </form>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel{' '}
        </button>{' '}
        <button className={classes.submit} onClick={confirmHandler}>
          {' '}
          Confirm{' '}
        </button>{' '}
      </div>
    </div>
  )
}

export default Checkout

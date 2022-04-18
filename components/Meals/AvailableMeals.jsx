import React, {useEffect, useState} from 'react'
import Card from '../UI/Card'
import styles from '../../styles/AvailableMeals.module.css'
import MealItem from './MealItem'
import Spinner from '../UI/Spinner'
const AvailableMeals = () => {
  const [ meals, setMeals ] = useState( [] )
  const [ loading, setIsLoading ] = useState( true )
  const [httpError, setHttpError] = useState()
  useEffect( () => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://fooduu-46c9b-default-rtdb.firebaseio.com/meals.json'
      )
      if ( !response.ok ) {
        throw new Error('something went wrong check network')
      }
      const responseData =  await response.json() 
      const loadedMeals = []
      for ( let key in responseData ) {
        loadedMeals.push( {
          id : key,
          name: responseData[ key ].name,
          price: responseData[ key ].price,
          description : responseData[key].description
        })
      }
      setMeals( loadedMeals )
      setIsLoading(false)
    }
    fetchMeals().catch( error => {
      setHttpError( error.message )
    setIsLoading(false)} )
  //   try {
  //    fetchMeals()
  //   } catch ( error ) {
  //     setHttpError( error.message )
  //     setIsLoading(false)
  //  }
    
  }, [] )
  if ( httpError ) {
    return (
      <section style={{ marginLeft: '36%' }}>
        {' '}
        <p style={{color : 'white'}}>.... {httpError} check network please... </p>{' '}
      </section>
    )
  }
  if ( loading ) {
    return (
      <div style={{marginLeft :'45%', color : 'white'}}>
        <Spinner /> loading data...., please wait!
      </div>
    ) 
  }
  const mealList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        price={meal.price}
        id={meal.id}
        description={meal.description}
      />
    )
  })
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals

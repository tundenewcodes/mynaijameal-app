import React, { useReducer } from 'react'
import FoodContext from './FoodContext'
const defaultCartState = {
  foodItems: [],
  totalAmount: 0,
}
// upon additem fooditems is no longer an empty array
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    let updatedFoodItems
    const updatedTotalAmount =
      state.totalAmount + action.items.price * action.items.amount
    const existingFoodItemIndex = state.foodItems.findIndex(
      (food) => food.id === action.items.id
    )
    const existingFoodItem = state.foodItems[existingFoodItemIndex]
    if (existingFoodItem) {
      const updatedFoodItem = {
        ...existingFoodItem,
          amount: existingFoodItem.amount + action.items.amount
       
      }
      updatedFoodItems = [...state.foodItems]
      updatedFoodItems[existingFoodItemIndex] = updatedFoodItem
    } else {
      updatedFoodItems = state.foodItems.concat(action.items)
    }
    return {
      foodItems: updatedFoodItems,
      totalAmount: updatedTotalAmount
    }
  }
  
  if ( action.type === 'REMOVE_ITEM' ) {
    let updatedFoodItems
   
    const existingFoodItemIndex = state.foodItems.findIndex( food => food.id === action.id )
    const existingFoodItem = state.foodItems[ existingFoodItemIndex ]
    const updatedTotalAmount = state.totalAmount - existingFoodItem.price
    if ( existingFoodItem.amount === 1 ) {
  updatedFoodItems = state.foodItems.filter(food => food.id !== action.id) 
    } else {
const updatedFoodItem = {...existingFoodItem, amount : existingFoodItem.amount - 1}
      updatedFoodItems = [...state.foodItems]
      updatedFoodItems[existingFoodItemIndex] = updatedFoodItem
    }
    return {
      foodItems: updatedFoodItems,
      totalAmount : updatedTotalAmount
    }
  }
  if ( action.type === 'CLEAR' ) {
    return defaultCartState
  }
  return defaultCartState
}
const CartProvider = (props) => {
  const [contextState, dispatchState] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addFoodItems = (foodItem) => {
    dispatchState({ type: 'ADD_ITEM', items: foodItem })
  }
  const removeFoodItem = (id) => {
    dispatchState({ type: 'REMOVE_ITEM', id: id })
  }
  const clearItem = () => {
    dispatchState({type : 'CLEAR'})
  }
  const context = {
    foodItems: contextState.foodItems,
    totalAmount: contextState.totalAmount,
    addItem: addFoodItems,
    removeItem: removeFoodItem,
    clearItem : clearItem
  }
  return (
    <FoodContext.Provider value={context}>
      {props.children}
    </FoodContext.Provider>
  )
}

export default CartProvider

import React from 'react'

const FoodContext = React.createContext( {
    foodItems: [],
    totalAmount: 0,
    addItem: ( item ) => { },
    removeItem: ( id ) => { },
    clearItem : ()=>{}
})
export default FoodContext
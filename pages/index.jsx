import Head from 'next/head'
import Modal from '../components/UI/Modal'
import Header from '../components/Layout/Header'
import Meals from '../components/Meals/Meals'
import MealsSummary from '../components/Meals/MealSummary'
import Cart from '../components/Cart/Cart'
import {useState } from 'react'
function Home() {
  const [ openCart, setOpenCart ] = useState( false )
  const openCarthandler = () => {
    setOpenCart(true)
  }
  const closeCarthandler = () => {
    setOpenCart(false)
  }
  return (
    <div>
      <Head>
        <title> My Foodmeal App </title>{' '}
        <meta
          name='description'
          content='foodmeal app created with nextJs. Apps shows best of Available Nigeria Dishes '
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>{' '}
     {openCart && <Cart open = {openCarthandler} close = {closeCarthandler}/>}
      <Header open ={openCarthandler} />
      <main>
        
        <Meals/>
      </main>
    
    </div>
  )
}
export default Home

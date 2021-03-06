import '../styles/globals.css'
import CartProvider from '../components/Store/CartProvider'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      {' '}
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp

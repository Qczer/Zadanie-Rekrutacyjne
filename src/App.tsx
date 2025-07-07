import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Store from './pages/Store'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
// import ProductsProvider from './contexts/Products/ProductsProvider'
// import CartProvider from './contexts/Cart/CartProvider'
// import LikedProvider from './contexts/Liked/LikedProvider'

function App() {
  return (
    <Router>
      {/* <ProductsProvider>
      <LikedProvider>
      <CartProvider> */}
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </CartProvider>
      </LikedProvider>
      </ProductsProvider> */}
    </Router>
  )
}

export default App

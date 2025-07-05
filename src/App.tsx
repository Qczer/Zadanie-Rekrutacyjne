import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Store from './pages/Store'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

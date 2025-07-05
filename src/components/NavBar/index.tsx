import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'

type NavBarProps = {
  searching: boolean;
  onSearch: (value: string) => void;
}

const NavBar = ({searching, onSearch}: NavBarProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const state = useLocation().state;
  
  return (
    <nav>
      <div>
        <span onClick={() => {if(pathname !== '/') navigate('/')}}>Home</span>
        <span onClick={() => {if(pathname !== '/contact') navigate('/contact')}}>Contact</span>
      </div>
      <div>
        {searching && (
          <input type='text' onChange={(e) => onSearch(e.target.value)}/>
        )}
        <FiSearch className="nav-icon" onClick={() => {navigate('/', { state: { searching: !state.searching } }); onSearch('')}}/>
        <FiShoppingCart className="nav-icon" onClick={() => {if(pathname !== '/cart') navigate('/cart')}}/>
      </div>
    </nav>
  )
}

export default NavBar;
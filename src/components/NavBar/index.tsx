import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useCartProducts } from '../../contexts/Cart';
import FilterButton from '../Buttons/FilterButton';
import type { Dispatch, SetStateAction } from 'react';

type NavBarProps = {
  searching?: boolean;
  onSearch?: (value: string) => void;
  setSearching?: (value: boolean) => void;
  showFilterButton?: boolean;
  selectedColorFilter?: string[];
  setSelectedColorFilter?: Dispatch<SetStateAction<string[]>>;
  availableColors?: string[];
}

const NavBar = ({searching, onSearch, setSearching, showFilterButton, selectedColorFilter, setSelectedColorFilter, availableColors}: NavBarProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { cartProducts } = useCartProducts()
  
  return (
    <nav>
      <div>
        <span onClick={() => {if(pathname !== '/') navigate('/')}}>Home</span>
        <span onClick={() => {if(pathname !== '/contact') navigate('/contact')}}>Contact</span>
      </div>
      <div>
        {(showFilterButton && selectedColorFilter && setSelectedColorFilter && availableColors) && <FilterButton selectedColorFilter={selectedColorFilter} setSelectedColorFilter={setSelectedColorFilter} availableColors={availableColors}/>}
        {(searching && onSearch) && (
          <input type='text' className="searchInput" onChange={(e) => onSearch(e.target.value)}/>
        )}
        <FiSearch className="navIcon" onClick={() => {if(pathname !== '/') {navigate('/', {state: {startSearching: true}})} else {if(setSearching) {setSearching(!searching)}; if(onSearch) {onSearch('')}}}}/>
        <div className="navIcon" style={{position: 'relative'}} onClick={() => {if(pathname !== '/cart') navigate('/cart')}}>
          <FiShoppingCart/>
          <div style={{position: 'absolute', right: -10, bottom: -10, background: '#4f80ff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{fontSize: 16}}>{cartProducts.length}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
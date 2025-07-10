import { useState, type Dispatch, type SetStateAction } from "react";

import './index.css'
import ColorButton from "../ColorButton";

type FilterProps = {
  selectedColorFilter: string[];
  setSelectedColorFilter: Dispatch<SetStateAction<string[]>>;
  availableColors: string[];
}

const FilterButton = ({selectedColorFilter, setSelectedColorFilter, availableColors}: FilterProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState('');

  const handleColorClick = (clickedColor: string) => {
    setSelectedColorFilter(prevColors => {
      // Check if the color is already in the filter array
      if (prevColors.includes(clickedColor)) {
        // If yes, return a new array without that color
        return prevColors.filter(c => c !== clickedColor);
      } else {
        // If no, return a new array with the added color
        return [...prevColors, clickedColor];
      }
    });
  };

  return (
    <div className='filters'>
      <button className='filterButton' onClick={() => {setIsMenuOpen(prev => !prev); setShowAnimation('show')}}>Filter</button>
      {isMenuOpen &&
        <div className={`filtersSettings ${showAnimation}`}>
          <div>
            <h1 style={{fontSize: '2rem'}}>Filters</h1>
            <svg className='closeButton' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {setShowAnimation('hide'); setTimeout(() => {setIsMenuOpen(false)}, 400)}}>
              <path d="M1 1 L23 23" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M23 1 L1 23" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div className='filtersColors'>
            <h2>Kolory</h2>
            <div>
              {availableColors.map((color, index) => {
                return (
                  <ColorButton key={index+1} color={color} active={selectedColorFilter.includes(color)} onClick={() => handleColorClick(color)} />
                )
              })}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default FilterButton;
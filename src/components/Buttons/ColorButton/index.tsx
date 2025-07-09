import './index.css'

type ColorButtonProps = {
  color: string;
  onClick: (value: string) => void;
}

const ColorButton = ({color, onClick}: ColorButtonProps) => {
  return (
    <div className="colorButton" style={{backgroundColor: color}} onClick={(e) => {e.stopPropagation(); onClick(color)}}></div>
  )
}

export default ColorButton;
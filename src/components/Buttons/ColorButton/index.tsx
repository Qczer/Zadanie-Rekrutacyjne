import './index.css'

type ColorButtonProps = {
  color: string;
  active: boolean;
  onClick: (value: string) => void;
}

const ColorButton = ({color, active, onClick}: ColorButtonProps) => {
  return (
    <div className={`colorButton${active ? ' active' : ''}`} style={{backgroundColor: color}} onClick={(e) => {e.stopPropagation(); onClick(color)}}></div>
  )
}

export default ColorButton;
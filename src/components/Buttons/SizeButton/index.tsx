import './index.css'

type ColorButtonProps = {
  size: string;
  active: boolean;
  onClick: (value: string) => void;
  width?: number;
}

const SizeButton = ({size, active, width, onClick}: ColorButtonProps) => {
  return (
    <div className={`sizeButton${active ? ' active' : ''}`} style={{fontSize: width ? width/2 : '1rem', width: width, height: width}} onClick={(e) => {e.stopPropagation(); onClick(size)}}>{size}</div>
  )
}

export default SizeButton;
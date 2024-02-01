
type buttonProps = {
  onClick: (...args: never[]) => void;
  children: React.ReactNode
};

const Button:React.FC<buttonProps> = ({onClick, children}) => {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
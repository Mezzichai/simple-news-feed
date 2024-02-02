import appStyles from '../styles/appStyles.module.css'

type LabeledInputProps = {
  id: string,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string
  type?: string
  isFocused: boolean
  children: React.ReactNode
};

const LabeledInput: React.FC<LabeledInputProps> = ({
  id, 
  onInputChange, 
  value, 
  type = "text",
  isFocused,
  children
}) => {
  return (
    //using fragments allow for "siblingization" without unnecessary praent elements
    <>
      <label htmlFor={id}>{children}</label>
      <input 
        className={appStyles.searchInput}
        id={id} 
        type={type}
        value={value} 
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  );
}

export default LabeledInput
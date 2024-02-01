import { SortOrder } from "../reducers/storiesReducer";
import dropDownStyles from "../styles/dropDownStyles.module.css";

type DropDownProps = {
  list: SortOrder[];
  handleClick: (order: SortOrder) => void;
}

const SortOrderDropDown: React.FC<DropDownProps> = ({ list, handleClick }) => {
  return (
    <ul className={dropDownStyles.dropDownList}>
      {list.map((order) => (
        <li className={dropDownStyles.item} key={order} onClick={() => handleClick(order)}>
          {order}
        </li>
      ))}
    </ul>
  )
}

export default SortOrderDropDown
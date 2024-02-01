import React from "react";
import { SortKey } from "../reducers/storiesReducer";
import dropDownStyles from "../styles/dropDownStyles.module.css";

type PropertyList = Record<SortKey, { name: string }>;

type DropDownProps = {
  list: PropertyList;
  handleClick: (key: SortKey) => void;
};

const DropDown: React.FC<DropDownProps> = ({ list, handleClick }) => {

  return (
    <ul className={dropDownStyles.dropDownList}>
      {Object.keys(list).map((key) => (
        <li className={dropDownStyles.item} key={key as SortKey} onClick={() => handleClick(key as SortKey)}>
          {list[key as SortKey].name}
        </li>
      ))}
    </ul>
  );
};

export default DropDown;

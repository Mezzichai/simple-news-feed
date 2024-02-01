import { memo, useState } from "react";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import SortDropDown from "./SortDropDown";
import { SortKey, SortOrder } from "../reducers/storiesReducer";
import dropDownStyles from '../styles/dropDownStyles.module.css'
import SortOrderDropDown from "./SortOrderDropDown";

type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Story[];

type ListProps = {
  list: Stories;
  onRemoveHandler: (id: number) => void;
  handleChangeSortKey: (key: SortKey) => void;
  handleChangeSortOrder: (order: SortOrder) => void;
  sortKey: SortKey;
  sortOrder: SortOrder;
}

const propertyList = {
  title: {name: "title"}, 
  author: {name: "author"},
  num_comments: {name: "comments"}, 
  points: {name: "points"}
}

const orderList: SortOrder[] = [
  "ascending", "descending"
]

const List: React.FC<ListProps> =  memo(({ list, onRemoveHandler, handleChangeSortKey, handleChangeSortOrder, sortKey, sortOrder }) => {
  const [sortOptionsOpen, setSortOptionsList] = useState<boolean>(false);
  const [orderOptionsOpen, setOrderOptionsList] = useState<boolean>(false);

  return (
    <>
      <div className={dropDownStyles.sortContainers}>
        <div className={dropDownStyles.sortMenu}>
          <span style={{marginRight: "7px"}}>
            Sort by: {propertyList[sortKey].name}
          </span>
          <FontAwesomeIcon icon={faChevronDown} onClick={() => setSortOptionsList(!sortOptionsOpen)}/>
          {sortOptionsOpen ? <SortDropDown list={propertyList} handleClick={handleChangeSortKey} /> : null}
        </div>

        <div style={{marginLeft: "20px"}} className={dropDownStyles.sortMenu}>
          <span style={{marginRight: "7px"}}>
            Order: {sortOrder}
          </span>
          <FontAwesomeIcon icon={faChevronDown} onClick={() => setOrderOptionsList(!orderOptionsOpen)}/>
          {orderOptionsOpen ? <SortOrderDropDown list={orderList} handleClick={handleChangeSortOrder} /> : null}
        </div>
      </div>
      <ul>
        {list.map((item) => (
          <Item 
            key={item.objectID}
            item={item}
            onRemoveHandler={onRemoveHandler}
          />
        ))}
      </ul>
    </>
  );
})

export default List
import { memo, useRef, useState } from "react";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { SortKey, SortOrder } from "../reducers/storiesReducer";
import dropDownStyles from '../styles/dropDownStyles.module.css'
import appStyles from '../styles/appStyles.module.css'
import useClickOutside from "../hooks/useClickOutside";

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



const List: React.FC<ListProps> =  memo(({ list, onRemoveHandler, handleChangeSortKey, handleChangeSortOrder, sortKey, sortOrder }) => {
  const [sortOptionsOpen, setSortOptionsList] = useState<boolean>(false);
  const [orderOptionsOpen, setOrderOptionsList] = useState<boolean>(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);

  useClickOutside(sortRef, sortOptionsOpen, setSortOptionsList)
  useClickOutside(orderRef, orderOptionsOpen, setOrderOptionsList)

  return (
    <>
      <div className={dropDownStyles.sortContainers}>
        <div className={dropDownStyles.sortMenu} ref={sortRef}>
          <span style={{marginRight: "7px"}}>
            Sort by: {propertyList[sortKey].name}
          </span>
          <FontAwesomeIcon icon={faChevronDown} onClick={() => {setSortOptionsList(!sortOptionsOpen)}}/>
          {sortOptionsOpen ? 
             <ul className={dropDownStyles.dropDownList}>
              {Object.keys(propertyList).map((key) => (
                <li className={dropDownStyles.item} key={key as SortKey} onClick={() => handleChangeSortKey(key as SortKey)}>
                  {propertyList[key as SortKey].name}
                </li>
              ))}
           </ul>
          : null}
        </div>

        <div style={{marginLeft: "20px"}} ref={orderRef} className={dropDownStyles.sortMenu}>
          <span style={{marginRight: "7px"}}>
            Order: {sortOrder}
          </span>
          <FontAwesomeIcon icon={faChevronDown} onClick={() => setOrderOptionsList(!orderOptionsOpen)}/>
          {orderOptionsOpen ? 
            <ul className={dropDownStyles.dropDownList}>
              <li className={dropDownStyles.item} onClick={() => handleChangeSortOrder("descending")}>
                descending
              </li>
              <li className={dropDownStyles.item} onClick={() => handleChangeSortOrder("ascending")}>
                ascending
              </li>
            </ul>
          : null}
        </div>
      </div>
      <ul className={appStyles.listContainer}>
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import appStyles from '../styles/appStyles.module.css'
import { faX } from '@fortawesome/free-solid-svg-icons';

type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};


type ItemProps = {
  item: Story;
  onRemoveHandler: (id: number) => void;
};



const Item:React.FC<ItemProps> = ({ item, onRemoveHandler }) => (
  <li className={appStyles.item}>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>Author: {item.author}</span>
    <span>Comments: {item.num_comments}</span>
    <span>Points: {item.points}</span>
    <button aria-label={`Remove ${item.title}`} className={appStyles.removeBtn} type="button" onClick={() => onRemoveHandler(item.objectID)}>
      <FontAwesomeIcon icon={faX} />
    </button>
  </li>
);

export default Item

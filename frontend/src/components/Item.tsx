
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
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <button type="button" onClick={() => onRemoveHandler(item.objectID)}>
      Remove item
    </button>
  </li>
);

export default Item

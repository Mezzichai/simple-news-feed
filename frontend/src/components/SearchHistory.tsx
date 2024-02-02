import historyStyles from '../styles/historyStyles.module.css'
type SearchHistoryProps = {
  handleSearch: (searchTerm: string) => void;
  history: string[];
}

const SearchHistory:React.FC<SearchHistoryProps> = ({handleSearch, history}) => {
console.log(history)
  return (
    <>
      <span>Last Searches:</span>
      <div className={historyStyles.container}>
        {history.map((searchTerm, index) => 
          <button
            className={historyStyles.btn}
            key={searchTerm + index}
            type="button"
            onClick={() => handleSearch(searchTerm)}
          >
            {searchTerm}
          </button>
        )}
      </div>
    </>
  )
}

export default SearchHistory
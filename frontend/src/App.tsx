import { useCallback, useEffect, useReducer, useState } from 'react';
import List from './components/List';
import useStorageState from './hooks/useStorageState';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import { SortKey, REMOVE_STORY, STORIES_FETCH_FAILURE, STORIES_FETCH_INIT, STORIES_FETCH_SUCCESS, storiesReducer, SORT_STORIES, SortOrder, MORE_STORIES_FETCH_INIT, MORE_STORIES_FETCH_SUCCESS, MORE_STORIES_FETCH_FAILURE } from './reducers/storiesReducer';
import SearchHistory from './components/SearchHistory';
import appStyles from './styles/appStyles.module.css'

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
const API_QUERY_PARAM = "query=";
const API_PAGE_PARAM = "&page=";


const getUrl = (searchTerm: string) => `${API_ENDPOINT}${API_QUERY_PARAM}${searchTerm}`;

const App = () => {
  
  const [searchTerm, setSearchTerm] = useStorageState(
    "search",
    "React"
  );

  const [history, setHistory] = useState<string[]>([getUrl(searchTerm)])

  const searchHistoryTerms = history.map(url => url.replace(`${API_ENDPOINT}${API_QUERY_PARAM}`, ""))

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchTerm: string) => {
    const url = getUrl(searchTerm);
    setHistory(prevState => {
      const newHistory = [url, ...prevState];
      if (newHistory.length > 6) {
        newHistory.pop();
      }
      return newHistory;
    });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearch(searchTerm)
    event.preventDefault();
  };

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false, isMoreLoading: false, isMoreError: false}
  );

  const handleFetchStories = useCallback(() => {
    dispatchStories({ type: STORIES_FETCH_INIT });
    axios
      .get(history[0])
      .then(result => { 
        dispatchStories({
          payload: result.data.hits, 
          type: STORIES_FETCH_SUCCESS
        })
      })
      .catch(() => dispatchStories({ type: STORIES_FETCH_FAILURE })
      )
  }, [history]);

  useEffect(() => {
   handleFetchStories();
  }, [handleFetchStories]);

  const [page, setPage] = useState<number>(0)
  
  const handleFetchMoreStories = () => {
    dispatchStories({ type: MORE_STORIES_FETCH_INIT });
    axios
      .get(`${history[0]}${API_PAGE_PARAM}${page + 1}`)
      .then(result => { 
        dispatchStories({
          payload: stories.data.concat(result.data.hits), 
          type: MORE_STORIES_FETCH_SUCCESS
        })
        setPage(prevPage => prevPage + 1)
      })
      .catch(() => dispatchStories({ type: MORE_STORIES_FETCH_FAILURE })
      )
  }
  

  const handleRemoveStory = useCallback((id: number) => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: id,
    });
  }, []);

 
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");

  useEffect(() => {
    dispatchStories({
      type: SORT_STORIES,
      payload: {sortKey, sortOrder}
    })
  }, [sortKey, sortOrder]);

  const handleChangeSortKey = (key: SortKey) => {
    setSortKey(key)
  };

  const handleChangeSortOrder = (order: SortOrder) => {
    setSortOrder(order)
  };
  
  return (
    <div className={appStyles.container}>
      <h1>My Hacker Stories</h1>
      <SearchForm  
        searchTerm={searchTerm}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />
      <SearchHistory history={searchHistoryTerms.slice(1)} handleSearch={handleSearch} />

      <hr />
      {stories.isError ?
        <p className={appStyles.statusInfo}>Error</p>
      : stories.isLoading ?
        <p className={appStyles.statusInfo}>Loading...</p>
      : 
        <>
          <List list={stories.data} onRemoveHandler={handleRemoveStory} handleChangeSortOrder={handleChangeSortOrder} handleChangeSortKey={handleChangeSortKey} sortKey={sortKey} sortOrder={sortOrder}/>
          {stories.isMoreError ?
            <>
              <p className={appStyles.statusInfo}>Error, try again</p>
              <button onClick={handleFetchMoreStories}>More</button>
            </>
          : stories.isMoreLoading ? 
            <p className={appStyles.statusInfo}>Loading...</p>
          :
            <button onClick={handleFetchMoreStories}>More</button>
          }
        </>
      }
    </div>
  );
};


export default App;
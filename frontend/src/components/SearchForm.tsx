import LabeledInput from "./LabeledInput"
import appStyles from '../styles/appStyles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
type SearchFormProps = {
  searchTerm: string,
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchForm:React.FC<SearchFormProps> = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return (
    <form className={appStyles.searchForm} onSubmit={handleSearchSubmit}>
      <LabeledInput
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong style={{marginRight: "10px"}}>Search:</strong>
      </LabeledInput>
      <button className={appStyles.searchBtn} aria-label="submit" type="submit" disabled={!searchTerm}>
          <FontAwesomeIcon icon={faSearch}/>
      </button>
  </form>
  )
}

export default SearchForm
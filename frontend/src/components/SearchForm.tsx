import LabeledInput from "./LabeledInput"

type SearchFormProps = {
  searchTerm: string,
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchForm:React.FC<SearchFormProps> = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <LabeledInput
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </LabeledInput>
      <button type="submit" disabled={!searchTerm}>
          Submit
      </button>
  </form>
  )
}

export default SearchForm
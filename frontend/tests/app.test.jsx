import { describe, it, vi, expect } from 'vitest';
import Item from '../src/components/Item';
import SearchForm from '../src/components/SearchForm';
import App from '../src/App';
import LabeledInput from '../src/components/LabeledInput';
import List from '../src/components/List';
import axios from 'axios';
import { storiesReducer, REMOVE_STORY } from '../src/reducers/storiesReducer';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  } from '@testing-library/react';
  

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

vi.mock('axios');

describe('App', () => {
  it('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });
    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    await waitFor(async () => await promise);

    expect(screen.queryByText(/Loading/)).toBeNull();

    expect(screen.getByText('React')).toBeInTheDocument();

    expect(screen.getByText('Redux')).toBeInTheDocument();

    expect(screen.getAllByText('Remove item').length).toBe(2);
  });


  it("fails fetching data", async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    try {
      await waitFor(async () => await promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText(/Error/)).toBeInTheDocument();
    }
  });
  

  it("removes a story", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });
    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await waitFor(async () => await promise)

    //refers to the number of times this was found 
    expect(screen.getAllByText("Remove item").length).toBe(2);
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Remove item")[0]);

    expect(screen.getAllByText("Remove item").length).toBe(1);
    expect(screen.queryByText("Jordan Walke")).toBeNull()
  });

  it('searches for specific stories', async () => {
    const reactPromise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    const anotherStory = {
      title: 'JavaScript',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      author: 'Brendan Eich',
      num_comments: 15,
      points: 10,
      objectID: 3,
    };

    const javascriptPromise = Promise.resolve({
      data: {
        hits: [anotherStory],
      },
    });

    axios.get.mockImplementation((url) => {
      if (url.includes('React')) {
        return reactPromise;
      }

      if (url.includes('JavaScript')) {
        return javascriptPromise;
      }

      throw Error();
    });

    // Initial Render

    render(<App />);

    // First Data Fetching

    await waitFor(async () => await reactPromise);

    expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('JavaScript')).toBeNull();

    expect(screen.queryByText('Jordan Walke')).toBeInTheDocument();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeInTheDocument();
    expect(screen.queryByText('Brendan Eich')).toBeNull();

    // User Interaction -> Search

    fireEvent.change(screen.queryByDisplayValue('React'), {
      target: {
        value: 'JavaScript',
      },
    });

    expect(screen.queryByDisplayValue('React')).toBeNull();
    expect(
      screen.queryByDisplayValue('JavaScript')
    ).toBeInTheDocument();

    fireEvent.submit(screen.queryByText('Submit'));

    // Second Data Fetching

    await waitFor(async () => await javascriptPromise);

    expect(screen.queryByText('Jordan Walke')).toBeNull();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeNull();
    expect(screen.queryByText('Brendan Eich')).toBeInTheDocument();
  });

  it("renders snapshot", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  })
});

describe('stories reducer', () => {
  it('removes a storty from stories', () => {
    const action = { type: REMOVE_STORY, payload: storyOne.objectID};
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action)
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    }
    expect(newState).toStrictEqual(expectedState)
  });
});


describe('Item', () => { 
  it("renders all properties", () => {
    render(<Item item={storyOne} />);

    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
  });

  it('renders a clickable dismiss button', () => {
    render(<Item item={storyOne} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('dismiss button calls the callback handler on click', () => {
    const handleRemoveItem = vi.fn();

    render(<Item item={storyOne} onRemoveHandler={handleRemoveItem}/>);
    
    fireEvent.click(screen.getByRole("button"));

    expect(handleRemoveItem).toHaveBeenCalledTimes(1)
  });

  it("renders snapshot", () => {
    const { container } = render(<Item item={storyOne} />);
    expect(container.firstChild).toMatchSnapshot();
  })
});



describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    handleSearchInput: vi.fn(),
    handleSearchSubmit: vi.fn(),
  };

  it('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByDisplayValue("React")).toBeInTheDocument()
  });

  it('renders the correct label', () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it("calls handleSearchInput on input changes", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux"},
    });
    expect(searchFormProps.handleSearchInput).toHaveBeenCalledTimes(1)

  });

  it("calls handleSearchSubmit on submit click", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(searchFormProps.handleSearchSubmit).toHaveBeenCalledTimes(1);
  })

  it("renders snapshot", () => {
    const { container } = render(<SearchForm {...searchFormProps} />);
    expect(container.firstChild).toMatchSnapshot();
  })
});


// describe('List', () => {
//   const List = {
//     searchTerm: 'React',
//     handleSearchInput: vi.fn(),
//     handleSearchSubmit: vi.fn(),
//   };
// })
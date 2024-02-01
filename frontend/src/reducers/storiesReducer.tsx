
type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Story[];
  
type StoriesFetchInitAction = {
  type: 'STORIES_FETCH_INIT';
};

type StoriesFetchSuccessAction = {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
};

type StoriesFetchFailureAction = {
  type: 'STORIES_FETCH_FAILURE';
};

type MoreStoriesFetchInitAction = {
  type: 'MORE_STORIES_FETCH_INIT';
};

type MoreStoriesFetchSuccessAction = {
  type: 'MORE_STORIES_FETCH_SUCCESS';
  payload: Stories;
};

type MoreStoriesFetchFailureAction = {
  type: 'MORE_STORIES_FETCH_FAILURE';
};


export type StoriesRemoveAction = {
  type: 'REMOVE_STORY';
  payload: number
};

export type SortOrder = "descending" | "ascending"

export type SortKey = 
  "title" | 
  "author" | 
  "num_comments" | 
  "points";

export type StoriesSortAction = {
  type: 'SORT_STORIES';
  payload: {
    sortOrder: SortOrder,
    sortKey: SortKey
  }
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | MoreStoriesFetchInitAction
  | MoreStoriesFetchSuccessAction
  | MoreStoriesFetchFailureAction
  | StoriesRemoveAction
  | StoriesSortAction;


type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  isMoreLoading: boolean;
  isMoreError: boolean;
}

export const REMOVE_STORY = "REMOVE_STORY";
export const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";
export const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";
export const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";

export const MORE_STORIES_FETCH_INIT = "MORE_STORIES_FETCH_INIT";
export const MORE_STORIES_FETCH_SUCCESS = "MORE_STORIES_FETCH_SUCCESS";
export const MORE_STORIES_FETCH_FAILURE = "MORE_STORIES_FETCH_FAILURE";

export const SORT_STORIES = "SORT_STORIES";

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case MORE_STORIES_FETCH_INIT:
      return {
        ...state,
        isMoreLoading: true,
        isMoreError: false,
      };
    case MORE_STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isMoreLoading: false,
        isMoreError: false,
        data: action.payload,
      };
    case MORE_STORIES_FETCH_FAILURE:
      return {
        ...state,
        isMoreLoading: false,
        isMoreError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story: Story) => action.payload !== story.objectID
        )
      };
    case SORT_STORIES:
      return {
        ...state,
        data: state.data.sort((a, b) => {
          if (action.payload.sortOrder === 'descending') {
            if (a[action.payload.sortKey] < b[action.payload.sortKey]) {
              return -1
            } else if (a[action.payload.sortKey] > b[action.payload.sortKey]) {
              return 1
            } else {
              return 0
            }
          } else {
            if (a[action.payload.sortKey] < b[action.payload.sortKey]) {
              return 1
            } else if (a[action.payload.sortKey] > b[action.payload.sortKey]) {
              return -1
            } else {
              return 0
            }
          }
        })
      }
    default:
      throw new Error();
  }
};
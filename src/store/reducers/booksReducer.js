import {
  FAVORITE_THIS_BOOK,
  GET_ALL_BOOKS,
  GET_FILTERED_BOOKS,
  GET_FAVORITE_BOOKS,
  EMPTY_FILTERED_BOOKS,
  GET_CHAPTERS_TITLES,
  GET_ONE_CHAPTER,
  GET_SEARCHED_BOOKS,
  GET_BOOKMARKS,
  GET_BOOK,
  GET_RECENT_CHAPTERS,
  EMPTY_SEARCHED_BOOKS,
} from "../actions/actionType";

const initialState = {
  books: [],
  book: null,
  favoritedBooks: [],
  filteredBooks: [],
  chaptersTitles: [],
  bookmarks: [],
  chapterContent: [],
  searchedBooks: [],
  isSearched: false
};

export function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
      };

    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    case GET_FAVORITE_BOOKS:
      return {
        ...state,
        favoritedBooks: action.payload,
      };

    case GET_FILTERED_BOOKS:
      return {
        ...state,
        filteredBooks: [...state.filteredBooks, ...action.payload],
      };

    case EMPTY_FILTERED_BOOKS:
      return {
        ...state,
        filteredBooks: action.payload,
      };

    case EMPTY_SEARCHED_BOOKS:
      return {
        ...state,
        isSearched: false,
        searchedBooks: [],
      };

    case GET_CHAPTERS_TITLES:
      return {
        ...state,
        chaptersTitles: action.payload,
      };
    // case POST_REVIEW:
    // state.book.comments.push(action.payload);

    // state.book.avgRate = (state.book.avgRate+action.payload.rate)/2

    //   return {
    //     ...state,
    //     book: state.book,
    //   };
    case GET_ONE_CHAPTER:
      return {
        ...state,
        chapterContent: action.payload,
      };

    case FAVORITE_THIS_BOOK:
      let bookId = action.payload.data.bookId;
      let bookArrayName = action.payload.bookArrayName;
      let copyArray = [];
      let propertToReplace = null;
      var index;

      if (bookArrayName === "bookmarks") {
        copyArray = state?.bookmarks?.slice();
        state?.bookmarks?.map((ele, idx) => {
          if (ele?._id === bookId) {
            index = idx;
          }
          return ele;
        });
        copyArray[index].isLike = !copyArray[index]?.isLike;
      } else if (bookArrayName === "favoritedBooks") {
        const copyBooks = [...state.books];
        var i = copyBooks?.findIndex((e) => {
          return e._id === bookId;
        });
        if (copyBooks.length > 0) {
          copyBooks[i].isLike = !copyBooks[i].isLike;
        }
        const copyfavbooks = [...copyBooks.filter((e) => e.isLike === true)];
        return {
          ...state,
          books: copyBooks,
          favoritedBooks: copyfavbooks,
        };
        // propertToReplace = { books: copyBooks, favoritedBooks: copyfavbooks };

        // if(i==-1){
        //   state.favoritedBooks[state?.favoritedBooks.length] = action.payload.data;
        // }else{
        //   state.favoritedBooks.splice(i,1)
        // }
      } else if (bookArrayName === "filteredBooks") {
        copyArray = state?.filteredBooks?.slice();

        state?.filteredBooks?.map((ele, idx) => {
          if (ele?._id === bookId) {
            index = idx;
          }
          return ele;
        });
      }

      copyArray[index].isLike = !copyArray[index]?.isLike;

      if (bookArrayName === "books") {
        propertToReplace = { books: copyArray };
      }
      // if (bookArrayName === "favoritedBooks") {
      //   propertToReplace = { favoritedBooks: state.favoritedBooks };
      // } else
      else if (bookArrayName === "filteredBooks") {
        propertToReplace = { filteredBooks: copyArray };
      }

      return {
        ...state,
        ...propertToReplace,
      };

    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };

    case GET_SEARCHED_BOOKS:
      return {
        ...state,
        isSearched: true,
        searchedBooks: action.payload,
      };
    case GET_RECENT_CHAPTERS:
      return {
        ...state,
        recentChapters: action.payload,
      };
    default:
      return state;
  }
}

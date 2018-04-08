import { combineReducers } from "redux";
import BooksReducer from "./reducer_books";
import ActiveBookReducer from "./reducer_activebook";

const rootReducer = combineReducers(
  //This is the global Application State
  {
    activeBook: ActiveBookReducer,
    books: BooksReducer
  }
);

export default rootReducer;

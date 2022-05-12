import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./MoviesSlices";

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;

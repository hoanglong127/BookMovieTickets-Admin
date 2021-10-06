import actionTypes from "../types";

const initialState = {
  movieList: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MOVIE_LIST:
      state.movieList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;

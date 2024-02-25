import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../common/api/movieApi";
import movieApi from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieSearchText = "harry";
    const response = await movieApi.get(
      `?apikey=${APIKEY}&s=${movieSearchText}`
    );
    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesSearchText = "friends";
    const response = await movieApi.get(
      `?apikey=${APIKEY}&s=${seriesSearchText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log("success");
        return { ...state, movies: action.payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("rejected");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        console.log("success");
        return { ...state, shows: action.payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        console.log("success");
        return { ...state, selectedMovieOrShow: action.payload };
      });
  },
});
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllSelectedMoviesOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;

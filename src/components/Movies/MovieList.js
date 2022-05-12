import React, { useState, useEffect } from "react";
import { Row, Pagination, Spin, Input } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard";

import {
  getMovies,
  getMoviesSuccess,
  getMoviesFailure,
} from "./../slices/MoviesSlices";

const { Search } = Input;

const baseUrl = `https://www.omdbapi.com/?`;
//const baseUrl = `https://www.omdbapi.com/?s={fast}&apikey=6682157d`;

const OMDbAPI = `http://www.omdbapi.com/?i=tt3896198&apikey=6682157d`;

const MoviesList = () => {
  const [searchText, setSearchText] = useState("fast");
  const [currentPage, setCurrentPage] = useState(1);

  const { movies: movieReducer } = useSelector((state) => state);

  const { loading: newLoading, movies: moviesResponse } = movieReducer;

  const { Search: newMovies, totalResults: newTotalPage } = moviesResponse;

  const dispatch = useDispatch();

  const fetchMoviesList = (page, searchValue) => {
    dispatch(getMovies());
    axios
      .get(`${baseUrl}s=${searchValue}&apikey=6682157d&page=${page}`)
      .then((response) => {
        dispatch(getMoviesSuccess(response?.data));
      })
      .catch((error) => {
        console.log(error, "error");
        getMoviesFailure();
      });
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    fetchMoviesList(currentPage, searchText);
  }, [currentPage, searchText]);

  return (
    <Spin spinning={newLoading} delay={200}>
      <Row>
        <Pagination
          defaultCurrent={currentPage}
          total={newTotalPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        <Search
          placeholder="Input movie name to search"
          onSearch={onSearch}
          defaultValue={searchText}
          enterButton
          style={{ width: "400px", marginLeft: "200px" }}
        />
      </Row>

      <Row>
        {newMovies &&
          newMovies?.length &&
          newMovies.map((movie) => (
            <div key={movie?.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </Row>
    </Spin>
  );
};

export default MoviesList;

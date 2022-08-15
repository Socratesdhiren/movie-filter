import React, { useState, useEffect } from "react";
import { Row, Pagination, Input, Spin } from "antd";
import MovieCard from "./MovieCard";
import {getMoviesList} from './API/MoviesAPI';

const { Search } = Input;

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("fast");

  const fetchMoviesList = async(page, searchValue) => {
    setLoading(true);
   const response = await getMoviesList(searchValue, page);
   if(response){
    setMovies(response?.data?.Search || []);
    setTotalPage(response?.data?.totalResults);
   }
 
   setLoading(false)
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const onSearch = (Value) => {
    setSearchText(Value);
  };

  useEffect(() => {
    fetchMoviesList(currentPage, searchText);
  }, [currentPage, searchText]);

  return (
    <Spin spinning={loading} delay={200}>
      <Row>
        <Pagination
          defaultCurrent={currentPage}
          total={totalPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />

        <Search
          placeholder="input search text"
          onSearch={onSearch}
          defaultValue={searchText}
          enterButton
          style={{ width: "400px", marginLeft: "200px" }}
        />
      </Row>

      <Row>
        {movies &&
          movies?.length &&
          movies.map((movie) => (
            <div key={movie?.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </Row>
    </Spin>
  );
};
export default MoviesList;

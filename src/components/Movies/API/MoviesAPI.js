import React from "react";
import { message } from "antd";
import axios from "axios";

const baseUrl = `https://www.omdbapi.com/?`;


export const getMoviesList = (searchValue, page) =>{
   return axios
    .get(`${baseUrl}s=${searchValue}&apikey=13aa1db5&page=${page}`)
    .then((response) => response)
    .catch(errror =>message.error(errror?.response?.data?.error?.message || ' Eroror') )
}
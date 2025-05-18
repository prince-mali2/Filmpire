import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SearchContainer, Input } from "./styles";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        console.log("here",query);
        
        dispatch(searchMovie(query));
    }
  };

  if(location.pathname != '/') return null;
  return (
    <div>
      <SearchContainer>
        <TextField
          onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          InputProps={{
            inputComponent: Input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>
    </div>
  );
};

export default Search;

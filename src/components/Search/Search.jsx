import { useState } from "react";
// import {  InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Searchs,SearchIconWrapper,StyledInputBase } from "./styles";
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
     
      <Searchs>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Searchs>
    </div>
  );
};

export default Search;

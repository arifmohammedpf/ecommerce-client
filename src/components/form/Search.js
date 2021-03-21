import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: event.target.value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form onSubmit={handleSubmit} className='form-inline my-2 my-lg-0'>
      <input
        onChange={handleChange}
        type='search'
        value={text}
        className='form-control mr-sm-2'
        placeholder='Search'
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;

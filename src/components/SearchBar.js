import React from "react";

const SearchBar = (props) => {
  return (
    <React.Fragment>
      <div>
        <input
          type="checkbox"
          name={props.value}
          onChange={props.handleChange}
        />
        <label htmlFor={props.value}>{props.value}</label>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;

import React from "react";

const ColorFilter = (props) => {

  return (
    <React.Fragment>
      {props.colors.map((item, index) => {
        if (item === undefined) {
          return null;
        } else {
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={item}
                onChange={(e) => props.allFilter(e.currentTarget.name)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ColorFilter;

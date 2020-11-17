import React, { useState } from "react";

const TypeFilter = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };


  return (
    <div className="dropdown">
      <button className="button-active" onClick={dropDown}>
        {selectedType.length > 0 ? selectedType : "Type"}
      </button>
      {showMenu ? (
        <div className="menu">
          {props.types.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => {
                  props.allFilter(e.target.value);
                  setSelectedType(e.target.value);
                  setShowMenu(!showMenu);
                }}
              >
                {element}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default TypeFilter;

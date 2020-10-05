import React, { useState } from "react";

const TypeFilter = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const everyType = props.cards.map((element) => element.types[0]);
  let types = [...new Set(Object.values(everyType))];

  const showAllType = () => {};

  return (
    <div className="dropdown">
      <button onClick={dropDown}>
        {selectedType.length > 0 ? selectedType : "Type"}
      </button>
      {showMenu ? (
        <div className="menu">
          <button onClick={showAllType}>Show all</button>
          {types.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => {
                  props.allFilter(e.target.value);
                  setSelectedType(e.target.value);
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

import React, { useState } from "react";

const SubtypeFilter = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSubtype, setSelectedSubtype] = useState("");

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };



  return (
    <div className="dropdown">
      <button onClick={dropDown}>
        {selectedSubtype.length > 0 ? selectedSubtype : "Subtype"}
      </button>
      {showMenu ? (
        <div className="menu">
          {console.log(props.subtypes.length)}
          {props.subtypes.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => {
                  props.allFilter(e.target.value);
                  setSelectedSubtype(e.target.value);
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
export default SubtypeFilter;

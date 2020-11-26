import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectType } from "../actions/type"

const TypeFilter = () => {
  const selectedType = useSelector(state => state.type)
  const dispatch = useDispatch();

  const types = ["Any type", "Artifact", "Conspiracy", "Creature", "Enchantment", "Instant", "Land", "Phenomenon", "Plane", "Planeswalker", "Scheme", "Sorcery", "Tribal", "Vanguard"]
  const [showMenu, setShowMenu] = useState(false);


  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };


  const handleClick = (e) => {
    dispatch(selectType(e.target.value));
    setShowMenu(!showMenu);
  }


  return (
    <div className="dropdown">
      <button className="button-active" onClick={dropDown}>
        {selectedType ? selectedType : "Type"}
      </button>
      {showMenu ? (
        <div className="menu">
          {types.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                onClick={handleClick}
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

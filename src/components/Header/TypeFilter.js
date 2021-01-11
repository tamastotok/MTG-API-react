import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageReset } from "../../state_management/actions/page";
import { selectType } from "./../../state_management/actions/type";
import { setIsClicked } from "./../../state_management/actions/isClicked";
import { setStatus } from "./../../state_management/actions/statusMessage";

const TypeFilter = () => {
   const types = [
      "Any type",
      "Artifact",
      "Conspiracy",
      "Creature",
      "Enchantment",
      "Instant",
      "Land",
      "Phenomenon",
      "Plane",
      "Planeswalker",
      "Scheme",
      "Sorcery",
      "Tribal",
      "Vanguard",
   ];
   const [showMenu, setShowMenu] = useState(false);
   const type = useSelector((state) => state.type);
   const dispatch = useDispatch();

   useEffect(() => {
      if (type !== "Any type") {
         dispatch(setIsClicked(true));
         dispatch(setPageReset());
         dispatch(setStatus("Loading..."));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [type]);

   const dropDown = (e) => {
      e.preventDefault();
      setShowMenu(!showMenu);
   };

   const handleClick = (e) => {
      setShowMenu(!showMenu);
      dispatch(selectType(e.target.value === "Any type" ? "" : e.target.value));
   };

   return (
      <div className="dropdown">
         <button className="button-active" onClick={dropDown}>
            {type ? type : "Type"}
         </button>
         {showMenu ? (
            <div className="menu">
               {types.map((element, index) => {
                  return (
                     <button key={index} value={element} onClick={handleClick}>
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

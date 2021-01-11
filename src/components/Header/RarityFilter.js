import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsClicked } from "./../../state_management/actions/isClicked";
import { selectRarity } from "./../../state_management/actions/rarity";
import { setStatus } from "./../../state_management/actions/statusMessage";
import { setPageReset } from "../../state_management/actions/page";

const RarityFilter = () => {
   const rarities = [
      "Any rarity",
      "Land",
      "Common",
      "Uncommon",
      "Rare",
      "Mythic",
   ];
   const [showMenu, setShowMenu] = useState(false);
   const rarity = useSelector((state) => state.rarity);
   const dispatch = useDispatch();

   useEffect(() => {
      if (rarity !== "Any rarity") {
         dispatch(setIsClicked(true));
         dispatch(setPageReset());
         dispatch(setStatus("Loading..."));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [rarity]);

   const dropDown = (e) => {
      e.preventDefault();
      setShowMenu(!showMenu);
   };

   const handleClick = (e) => {
      setShowMenu(!showMenu);
      dispatch(
         selectRarity(e.target.value === "Any rarity" ? "" : e.target.value)
      );
   };

   return (
      <div className="dropdown">
         <button className="button-active" onClick={dropDown}>
            {rarity ? rarity : "Rarity"}
         </button>
         {showMenu ? (
            <div className="menu">
               {rarities.map((element, index) => {
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

export default RarityFilter;

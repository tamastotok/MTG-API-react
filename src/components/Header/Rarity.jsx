import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRarity } from "../../actions/cards_action";
import { setStatus } from "../../actions/set_status";
import { resetPage } from "../../actions/page_action";

export default function Rarity() {
   const rarities = [
      "Any rarity",
      "Land",
      "Common",
      "Uncommon",
      "Rare",
      "Mythic",
   ];

   const [showMenu, setShowMenu] = useState(false);

   const rarity = useSelector((state) => state.cards.rarity);
   const dispatch = useDispatch();

   const dropDown = (e) => {
      e.preventDefault();
      setShowMenu(!showMenu);
   };

   const handleClick = (e) => {
      setShowMenu(!showMenu);
      dispatch(
         setRarity(e.target.value === "Any rarity" ? "" : e.target.value)
      );
      dispatch(resetPage());
      dispatch(setStatus("Loading..."));
   };

   return (
      <div className="dropdown">
         <button className="button-active" onClick={dropDown}>
            {rarity || "Rarity"}
         </button>
         {showMenu ? (
            <div className="menu">
               {rarities.map((item, index) => {
                  return (
                     <button key={index} value={item} onClick={handleClick}>
                        {item}
                     </button>
                  );
               })}
            </div>
         ) : null}
      </div>
   );
}

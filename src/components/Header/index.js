import React from "react";
import Name from "./Name";
import ColorFilter from "./ColorFilter";
import RarityFilter from "./RarityFilter";
import TypeFilter from "./TypeFilter";

const Header = () => {
   return (
      <div id="header">
         <Name />
         <ColorFilter />
         <div id="dropdown-container">
            <TypeFilter />
            <RarityFilter />
         </div>
      </div>
   );
};

export default Header;

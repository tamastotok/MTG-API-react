import React from "react";
import Name from "./Name";
import Colors from "./Colors";
import Rarity from "./Rarity";
import Type from "./Type";

const Header = () => {
   return (
      <div id="header">
         <Name />
         <Colors />
         <div id="dropdown-container">
            <Type />
            <Rarity />
         </div>
      </div>
   );
};

export default Header;

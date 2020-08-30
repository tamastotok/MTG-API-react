import React, { useState } from "react";

const Button = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button onClick={dropDown}>Types</button>
      {showMenu ? (
        <div className="menu">
          <button> Menu item 1 </button>
          <button> Menu item 2 </button>
          <button> Menu item 3 </button>
        </div>
      ) : null}
    </div>
  );
};
export default Button;

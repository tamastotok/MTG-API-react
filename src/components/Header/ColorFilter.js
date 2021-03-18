import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColors } from "./../../actions/colors";
import { colorsCheckBox } from "./../../actions/colorsCheckBox";
import { setPageReset } from "../../actions/page";
import { setIsClicked } from "./../../actions/isClicked";
import { setStatus } from "./../../actions/statusMessage";

const ColorFilter = () => {
   const everyColor = ["Black", "Blue", "Green", "Red", "White"];
   const colorsParentRef = useRef();

   const colors = useSelector((state) => state.colors);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setIsClicked(true));
      dispatch(setPageReset());
      dispatch(setStatus("Loading..."));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [colors]);

   const handleClick = (e) => {
      dispatch(selectColors(e.currentTarget.name));
      dispatch(colorsCheckBox(e.currentTarget.id));
   };

   return (
      <div className="color-checkbox-container" ref={colorsParentRef}>
         {everyColor.map((item, index) => {
            return (
               <div key={index} className="color-checkbox">
                  <input
                     id={index}
                     type="checkbox"
                     name={item}
                     onClick={handleClick}
                  />
                  <label htmlFor={item}>{item}</label>
               </div>
            );
         })}
      </div>
   );
};

export default ColorFilter;

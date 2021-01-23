import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColors } from "./../../state_management/actions/colors";
import { colorsCheckBox } from "./../../state_management/actions/colorsCheckBox";
import { setPageReset } from "../../state_management/actions/page";
import { setIsClicked } from "./../../state_management/actions/isClicked";
import { setStatus } from "./../../state_management/actions/statusMessage";

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

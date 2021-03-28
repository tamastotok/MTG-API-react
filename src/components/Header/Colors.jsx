import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../actions/cards_action";
import { setCheckbox } from "../../actions/checkbox_action";
import { resetPage } from "../../actions/page_action";
import { setStatus } from "../../actions/set_status";
import { DEFAULT_COLORS } from "../../data";

export default function Colors() {
   const colors = useSelector((state) => state.cards.colors);
   const colorsParentRef = useRef(null);
   const dispatch = useDispatch();

   const handleClick = (e) => {
      dispatch(setColors(e.currentTarget.name));
      dispatch(setCheckbox(e.currentTarget.id));
      dispatch(resetPage());
      dispatch(setStatus("Loading..."));
   };

   // Search if colors array includes checkbox name,
   // if yes then that checkbox is checked
   const checkboxChecked = () => {
      if (colorsParentRef.current) {
         for (let i = 0; i < DEFAULT_COLORS.length; i++) {
            if (
               colors.length > 0 &&
               Object.values(colors).includes(
                  colorsParentRef.current.children[i].children[0].name
               )
            ) {
               colorsParentRef.current.children[i].children[0].checked = true;
            }
         }
      }
   };

   // Change checkbox checked value after refresh
   useEffect(() => {
      checkboxChecked();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [colors]);

   return (
      <div className="color-checkbox-container" ref={colorsParentRef}>
         {DEFAULT_COLORS.map((item, index) => {
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
}

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectColors } from "../actions/colors"
import { colorsCheckBox, resetColorsCheckBox } from "../actions/colorsCheckBox";



const ColorFilter = () => {
   const filterClicked = useSelector(state => state.filterButton)
   const searchClicked = useSelector(state => state.searchButton)
   const colorIndex = useSelector(state => state.colorsCheckBox)
   const dispatch = useDispatch();

   const everyColor = ["Black", "Blue", "Green", "Red", "White"];
   const colorsParentRef = useRef();


   const handleClick = (e) => {
      dispatch(selectColors(e.currentTarget.name))
      dispatch(colorsCheckBox(e.currentTarget.id))
   }


   useEffect(() => {
      colorIndex.map(i =>
         colorsParentRef.current.children[i].children[0].checked = true
      )
   }, [filterClicked])

   useEffect(() => {
      if (searchClicked) {
         colorIndex.map(i =>
            colorsParentRef.current.children[i].children[0].checked = false
         )
         dispatch(resetColorsCheckBox())
      }
   }, [searchClicked])


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

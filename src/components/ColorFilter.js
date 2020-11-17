import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom"


const ColorFilter = (props) => {
   //let history = useHistory();

   //   const isChecked = useRef([]);
   const [checkIndex, setCheckIndex] = useState([])
   const boxes = document.querySelectorAll(".color-checkbox");
   const [eventArray, setEventArray] = useState([])

   const handleChange = (e, index) => {
      setEventArray(prev => prev.includes(e) ? prev.filter(r => r !== e) : [...prev, e])
      //isChecked.current.checked = true
      setCheckIndex(prev => prev.includes(index) ? prev.filter(r => r !== index) : [...prev, index].sort())

   }

   /*useEffect(() => {

      if (eventArray.length > 0) {
         history.push(`/filter?c=${eventArray}`)
      }

   }, [eventArray])*/


   useEffect(() => {
      const indexData = JSON.parse(sessionStorage.getItem("checkIndex"))
      setCheckIndex(indexData ? indexData : [])
   }, [])

   useEffect(() => {
      sessionStorage.setItem("checkIndex", JSON.stringify(checkIndex))
   }, [checkIndex])


   //console.log(boxes[checkIndex])

   /*if (window.performance) {
      if (PerformanceNavigation.TYPE_RELOAD === 1 && checkIndex.length > 0) {
         for (let i of checkIndex) {
            boxes[i].checked = true
         }
      }
   }*/


   return (
      <React.Fragment>
         {props.colors.map((item, index) => {
            return (
               <div key={index}>

                  <input className="color-checkbox"
                     id={index}
                     type="checkbox"
                     name={item}
                     //                   ref={isChecked}
                     //checked={isChecked}
                     ref={props.colorChecked}
                     onChange={(e) => { props.allFilter(e.currentTarget.name); /*handleChange(e.currentTarget.name, index) */ }}
                  />

                  <label htmlFor={item}>{item}</label>
               </div>
            );
         })}
      </React.Fragment>
   );
};

export default ColorFilter;

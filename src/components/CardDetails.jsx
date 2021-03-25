import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../actions/set_loading";
import card from "./../images/card.gif";

export default function CardDetails({ singleCardData }) {
   const isLoading = useSelector((state) => state.isLoading);

   const nameState = useSelector((state) => state.cards.name);
   const colorsState = useSelector((state) => state.cards.colors);
   const typeState = useSelector((state) => state.cards.type);
   const rarityState = useSelector((state) => state.cards.rarity);

   const dispatch = useDispatch();
   const history = useHistory();

   const handleClick = () => {
      // if name, color, type, rarity is empty then home page
      if (!nameState && !colorsState && !typeState && !rarityState) {
         history.push("/");
      } else {
         history.goBack();
      }
      dispatch(setIsLoading(false));
   };

   const {
      imageUrl,
      name,
      colors,
      types,
      subtypes,
      rarity,
      set,
      setName,
      power,
      toughness,
      text,
      flavor,
   } = singleCardData;

   return (
      <>
         {!isLoading ? (
            <div className="loading-screen">
               <h3>Loading</h3>
               <img src={card} alt={"card-animation"} />
            </div>
         ) : (
            <div className="card-details-container">
               <button onClick={handleClick} className="back-button">
                  BACK
               </button>

               <div className="content">
                  <img src={imageUrl} alt={name} />
                  <table>
                     <tbody>
                        <tr>
                           <th>Name:</th>
                           <td>{name}</td>
                        </tr>
                        <tr>
                           <th>Colors:</th>
                           <td>{colors}</td>
                        </tr>
                        <tr>
                           <th>Types:</th>
                           <td>{types}</td>
                        </tr>
                        <tr>
                           <th>Subtypes:</th>
                           <td>{subtypes}</td>
                        </tr>
                        <tr>
                           <th>Rarity:</th>
                           <td>{rarity}</td>
                        </tr>
                        <tr>
                           <th>Set:</th>
                           <td>
                              {set} / {setName}
                           </td>
                        </tr>
                        <tr>
                           <th>Stats:</th>
                           <td>
                              {power} / {toughness}
                           </td>
                        </tr>
                     </tbody>
                     <tfoot>
                        <tr>
                           <td>{text}</td>
                        </tr>
                        <tr>
                           <td>
                              <em>{flavor}</em>
                           </td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
            </div>
         )}
      </>
   );
}

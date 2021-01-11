import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getCardByID } from "./API";
import card from "./../images/card.gif";

const Details = ({ match }) => {
   const [cardDetail, setCardDetail] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      console.log("fetching data from details...");
      getCardByID(match.params.id.replace("id=", "")).then((cardData) => {
         setCardDetail(cardData.card);
         setIsLoaded(true);
      });
   }, [match]);

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
   } = cardDetail;

   return (
      <React.Fragment>
         {!isLoaded ? (
            <div className="loading-screen">
               <h3>Loading</h3>
               <img src={card} alt={"card-animation"} />
            </div>
         ) : (
            <div className="card-details-container">
               <Link to="/">
                  <h3 className="back-button">BACK</h3>
               </Link>
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
      </React.Fragment>
   );
};

export default Details;

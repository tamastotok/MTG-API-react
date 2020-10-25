import React, { useState, useEffect } from 'react'
import card from "../card.gif"
import { getCardByID, getCardByName } from './API';
import { Link } from "react-router-dom";


const Details = ({ match }) => {
   const [cardDetail, setCardDetail] = useState([])
   const [isLoaded, setIsLoaded] = useState(false);


   useEffect(() => {
      getCardByID(match.params.id.replace("id=", "")).then((details) => {
         console.log(match)
         console.log(details)
         setCardDetail(details.card)
         setIsLoaded(true)
      });
   }, [])


   /*useEffect(() => {
      getCardByName(match.params.name.replace("name=", "")).then((details) => {
         console.log(match)
         console.log(details)
         setCardDetail(details)
         setIsLoaded(true)
      });
   }, [])*/

   //name,colors,types,suptyes,rarity,img,set,setname,text

   if (!isLoaded) {
      return (
         <div className="loading-screen">
            <h3>Small indie company, please be patient!</h3>
            <img src={card} alt={"card-animation"} />
         </div>
      );
   } else {
      return (
         <div className="card-details-container">
            <Link to={`/`}>
               <h4 className="back-button">BACK</h4>
            </Link>
            <div className="content">
               <img src={cardDetail.imageUrl} alt={cardDetail.name} />
               <table>
                  <tbody>
                     <tr>
                        <th>Name:</th>
                        <td>{cardDetail.name}</td>
                     </tr>
                     <tr>
                        <th>Colors:</th>
                        <td>{cardDetail.colors}</td>
                     </tr>
                     <tr>
                        <th>Types:</th>
                        <td>{cardDetail.types}</td>
                     </tr>
                     <tr>
                        <th>Subtypes:</th>
                        <td>{cardDetail.subtypes}</td>
                     </tr>
                     <tr>
                        <th>Rarity:</th>
                        <td>{cardDetail.rarity}</td>
                     </tr>
                     <tr>
                        <th>Set:</th>
                        <td>{cardDetail.set} / {cardDetail.setName}</td>
                     </tr>
                     <tr>
                        <th>Stats:</th>
                        <td>{cardDetail.power} / {cardDetail.toughness}</td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr><td>{cardDetail.text}</td></tr>
                     <tr><td>{cardDetail.flavor}</td></tr>
                  </tfoot>
               </table>
            </div>
         </div>

      );
   }
};

export default Details;
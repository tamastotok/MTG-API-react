import React, { useState, useEffect, useRef } from 'react'
import card from "../card.gif"
import { searchCardsbyId } from './API';
import { Link } from "react-router-dom";



const Details = ({ match }) => {
   const [cardDetail, setCardDetail] = useState([])
   const [isLoaded, setIsLoaded] = useState(false);

   const isFirstRender = useRef(true);


   console.log("clicked")

   /*useEffect(() => {

      if (props.isClicked) {

         console.log(match)


         searchCardsbyId(match.params.id.replace("id=", "")).then((dataId) => {
            console.log(dataId)
            setCardDetail(dataId.card)
            setIsLoaded(true)
         });
      }


   }, [])*/



   return (

      <React.Fragment>
         <h3>Detail, Small indie company, please be patient!</h3>

         {!isLoaded ?
            <div className="loading-screen">

               <img src={card} alt={"card-animation"} />
            </div>
            :
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
         }
      </React.Fragment>

   )
};

export default Details;
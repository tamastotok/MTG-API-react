import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Deck from "./components/Deck";
import CardDetails from "./components/CardDetails";
import useFetchSingleCard from "./hooks/useFetchSingleCard";
import useFetchMultipleCards from "./hooks/useFetchMultipleCards";
import "./App.css";

//*   API:              https://docs.magicthegathering.io
//*   Javascript SDK:   https://github.com/MagicTheGathering/mtg-sdk-javascript

export default function App() {
   const status = useSelector((state) => state.status);
   const fetchMultipleCards = useFetchMultipleCards();
   const fetchSingleCard = useFetchSingleCard();

   return (
      <div className="App">
         <Switch>
            <Route path="/" exact>
               <h4 className="status">{status}</h4>
               <Header />
            </Route>

            <Route path="/result/:cards">
               <h4 className="status">{status}</h4>
               <Header />
               {fetchMultipleCards.length === 0 ? null : (
                  <Deck cardsData={fetchMultipleCards} />
               )}
            </Route>

            <Route path="/card/:id">
               <CardDetails singleCardData={fetchSingleCard} />
            </Route>
         </Switch>
      </div>
   );
}

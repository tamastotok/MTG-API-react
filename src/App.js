import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards } from "./components/API";
import { setIsClicked } from "./state_management/actions/isClicked";
import { setStatus } from "./state_management/actions/statusMessage";
import Header from "./components/Header";
import Deck from "./components/Deck";
import Details from "./components/Details";
import "./App.css";

//*   API:              https://docs.magicthegathering.io
//*   Javascript SDK:   https://github.com/MagicTheGathering/mtg-sdk-javascript

// scrollTo(0,0) doesn't work on Safari

const App = () => {
   const colors = useSelector((state) => state.colors);
   const type = useSelector((state) => state.type);
   const rarity = useSelector((state) => state.rarity);
   const page = useSelector((state) => state.page);
   const cardName = useSelector((state) => state.cardName);

   const isClicked = useSelector((state) => state.isClicked);
   const statusMessage = useSelector((state) => state.statusMessage);

   const dispatch = useDispatch();
   let history = useHistory();

   // Cards:
   const [cardData, setCardData] = useState([]);

   // Reset everything after refresh
   useEffect(() => {
      history.push("/");
   }, [history]);

   // Object for history.push
   const urlParams = {
      colorsUrl: `colors-${colors};`,
      typeUrl: `type-${type};`,
      rarityUrl: `rarity-${rarity};`,
      nameUrl: `name-${cardName};`,
   };
   // Delete empty keys from urlParams
   const deleteUrlParams = (obj) => {
      for (let key in obj) {
         if (
            obj[key] === "colors-;" ||
            obj[key].includes("Any type") ||
            obj[key].includes("Any rarity") ||
            obj[key] === "name-;"
         ) {
            delete obj[key];
         }
      }
      return obj;
   };

   // Object for fetch data
   const searchParams = {
      name: cardName,
      colors: colors.toString(),
      types: type,
      rarity: rarity,
   };
   // Delete empty keys from searchParams
   const deleteObjectKeys = (obj) => {
      for (let key in obj) {
         if (
            obj[key].length === 0 ||
            obj[key] === "" ||
            obj[key] === "Any type" ||
            obj[key] === "Any rarity"
         ) {
            delete obj[key];
         }
      }
      return obj;
   };

   useEffect(() => {
      if (isClicked) {
         //console.log("fetching data...");
         history.push({
            pathname: "/cards/query",
            search: `?${Object.values(deleteUrlParams(urlParams))}page-${page}`,
            /*state: {
               ...deleteObjectKeys(searchParams),
               page: page,
               checkBox: colorsCheckBox,
            },*/
         });

         getAllCards(deleteObjectKeys(searchParams), page).then(
            (allCardsData) => {
               setCardData((prev) =>
                  page === 1 ? allCardsData : [...prev, ...allCardsData]
               );
               dispatch(
                  setStatus(allCardsData.length === 0 ? "No more cards!" : "")
               );
            }
         );
         dispatch(setIsClicked(false));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isClicked, page]);

   return (
      <div className="App">
         <Switch>
            <Route path="/" exact>
               <h4 className="status">{statusMessage}</h4>
               <Header />
            </Route>

            <Route path="/cards/:query">
               <h4 className="status">{statusMessage}</h4>
               <Header />
               {cardData.length > 0 ? <Deck cardData={cardData} /> : null}
            </Route>

            <Route path="/id/:id" component={Details} />
         </Switch>
      </div>
   );
};

export default App;

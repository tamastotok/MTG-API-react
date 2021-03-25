// Fetch multiple cards by their name, colors, type, rarity
import mtg from "mtgsdk";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "../actions/set_status";
import useCreateSearchParams from "./useCreateSearchParams";

export default function useFetchMultipleCards() {
   const [cards, setCards] = useState([]);

   const name = useSelector((state) => state.cards.name);
   const colors = useSelector((state) => state.cards.colors);
   const types = useSelector((state) => state.cards.type);
   const rarity = useSelector((state) => state.cards.rarity);
   const page = useSelector((state) => state.page);
   const dispatch = useDispatch();

   const url = useCreateSearchParams();

   // Object for fetch data
   const fetchApiParams = {
      name,
      colors: colors.toString(),
      types,
      rarity,
      page,
      pageSize: 50,
   };

   const getAllCards = async () => {
      try {
         const res = await mtg.card.where({
            ...fetchApiParams,
         });
         setCards((prevState) => (page === 1 ? res : [...prevState, ...res]));
         dispatch(setStatus(res.length === 0 ? "No more cards!" : ""));
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (url) {
         getAllCards();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [url, page]);

   return cards;
}

// Create dynamic url based on name, colors, type, rarity or id
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useCreateSearchParams() {
   const id = useSelector((state) => state.cards.id);
   const name = useSelector((state) => state.cards.name);
   const colors = useSelector((state) => state.cards.colors);
   const type = useSelector((state) => state.cards.type);
   const rarity = useSelector((state) => state.cards.rarity);
   const page = useSelector((state) => state.page);

   const history = useHistory();

   // Make an object for useHistory.push
   const query = {
      name: name.length > 0 ? `name=${name}` : "",
      colors: colors.length > 0 ? `colors=${colors}` : "",
      type: type ? `type=${type}` : "",
      rarity: rarity ? `rarity=${rarity}` : "",
   };

   // Delete empty object keys
   const deleteEmptyObjectKeys = () => {
      for (let key in query) {
         if (
            query[key] === "" ||
            query[key].includes("Any type") ||
            query[key].includes("Any rarity")
            //obj[key] === "name-;"
         ) {
            delete query[key];
         }
      }
      return query;
   };

   // Separate object values with "&"
   const formatQuery = Object.values(deleteEmptyObjectKeys())
      .map((r) => {
         return r;
      })
      .join("&");

   useEffect(() => {
      // search multiple cards by filters
      if (formatQuery.length > 0) {
         history.push({
            pathname: "/result/cards",
            search: `${formatQuery}&page-${page}`,
         });
         // search specific card by id
      } else if (id.length > 0) {
         history.push({
            pathname: "/card/search",
            search: `id=${id}`,
         });
         // redirect to homepage if no filters and id is selected
      } else {
         history.push({
            pathname: "/",
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [name, colors, type, rarity, page]);

   return formatQuery;
}

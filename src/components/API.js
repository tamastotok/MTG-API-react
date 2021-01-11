import mtg from "mtgsdk";

export const getAllCards = async (params, page) => {
   let res = await mtg.card.where({
      ...params,
      page: page,
      PageSize: 50,
   });
   let allCardsData = await res;
   return allCardsData;
};

export const getCardByID = async (id) => {
   let res = await mtg.card.find(id);
   let cardData = await res;
   console.log(cardData);
   return cardData;
};

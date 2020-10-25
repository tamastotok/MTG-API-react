//   Types and Subtypes
export const getTypes = async (opt) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/${opt}`)
          .catch(err => console.error(err));
     let types = await response.json();
     return types;
}

//   All cards/filter/infinite scroll
export const getAllCards = async (color, type, subtype, rarity, page) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards?colors=${color}&types=${type}&subtypes=${subtype}&rarity=${rarity}&page=${page}`)
          .catch(err => console.error(err));
     let allCardsData = {
          body: await response.json(),
          header: response.headers.get("Total-Count")
     }
     return allCardsData;
}

//   Search
export const searchCards = async (name, page) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${name}&page=${page}`)
          .catch(err => console.error(err));
     let searchCardsData = {
          body: await response.json(),
          header: response.headers.get("Total-Count")
     }
     return searchCardsData;
}


//   Search by ID
export const getCardByID = async (id) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`)
          .catch(err => console.error(err));
     let details = await response.json();

     return details;
}



//   Search by Name
export const getCardByName = async (name) => {
     let response = await fetch(`https://api.scryfall.com/cards/named?exact=${name}`)
          .catch(err => console.error(err));
     let details = await response.json();

     return details;
}
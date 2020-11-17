//   Subtypes
export const getTypes = async (opt) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards?types=${opt}`)
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

//   Search by id
export const searchCardsbyId = async (id) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`)
          .catch(err => console.error(err));
     let dataId = await response.json();


     return dataId;
}


//   Search by Name
export const getCardByName = async (name) => {
     let response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${name}`)
          .catch(err => console.error(err));
     let nameData = {
          body: await response.json(),
          header: response.headers.get("Total-Count")
     }
     return nameData;
}

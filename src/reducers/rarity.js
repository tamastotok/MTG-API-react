const rarityReducer = (state = "Any rarity", action) => {
     switch (action.type) {
          case "SELECT_RARITY":
               return action.payload
          default:
               return state
     }
}
export default rarityReducer;
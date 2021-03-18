const cardNameReducer = (state = "", action) => {
     switch (action.type) {
          case "CHANGE_CARDNAME":
               return action.payload
          default:
               return state
     }
}
export default cardNameReducer
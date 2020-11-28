const cardNameCheckBoxReducer = (state = false, action) => {
     switch (action.type) {
          case "CARDNAME_CHECKBOX_CHECKED":
               return action.payload
          case "CARDNAME_CHECKBOX_OPPOSITE_STATE":
               return !state
          default:
               return state
     }
}
export default cardNameCheckBoxReducer
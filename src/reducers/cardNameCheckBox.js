const cardNameCheckBoxReducer = (state = false, action) => {
     switch (action.type) {
          case "CARDNAME_CHECKBOX_CHECKED":
               return action.payload
          default:
               return state
     }
}
export default cardNameCheckBoxReducer
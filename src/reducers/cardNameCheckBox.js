const cardNameCheckBoxReducer = (state = false, action) => {
     switch (action.type) {
          case "CARDNAME_CHECKBOX_CHECKED":
               return !state
          default:
               return state
     }
}
export default cardNameCheckBoxReducer
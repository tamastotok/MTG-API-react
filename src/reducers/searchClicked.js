const searchReducer = (state = false, action) => {
     switch (action.type) {
          case "SEARCH_IS_CLICKED":
               return action.payload
          default:
               return state
     }
}
export default searchReducer
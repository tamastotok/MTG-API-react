const filterReducer = (state = false, action) => {
     switch (action.type) {
          case "FILTER_IS_CLICKED":
               return action.payload
          default:
               return state
     }
}
export default filterReducer
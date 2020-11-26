const searchPageReducer = (state = 1, action) => {
     switch (action.type) {
          case "SEARCH_PAGE_NUMBER_INCREMENT":
               return state + 1
          case "SEARCH_PAGE_NUMBER_RESET":
               return 1
          default:
               return state
     }
}

export default searchPageReducer;
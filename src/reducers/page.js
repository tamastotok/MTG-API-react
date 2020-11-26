const pageReducer = (state = 1, action) => {
     switch (action.type) {
          case "PAGE_NUMBER_INCREMENT":
               return state + 1
          case "PAGE_NUMBER_RESET":
               return 1
          default:
               return state
     }
}

export default pageReducer;
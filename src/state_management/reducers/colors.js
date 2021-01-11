const colorsReducer = (state = [], action) => {
     switch (action.type) {
          case "SELECT_COLOR":
               if (state.includes(action.payload)) {
                    return state.filter(r => r !== action.payload)
               }
               else {
                    return [...state, action.payload].sort()
               }
          case "RESET_COLOR":
               return []
          default:
               return state;
     }
}
export default colorsReducer;
const colorsCheckBoxReducer = (state = [], action) => {
     switch (action.type) {
          case "COLORS_CHECKBOX_CHECKED":
               if (state.includes(action.payload)) {
                    return state.filter(r => r !== action.payload)
               }
               else {
                    return [...state, action.payload].sort()
               }
          case "COLORS_CHECKBOX_RESET":
               return []
          default:
               return state
     }
}
export default colorsCheckBoxReducer
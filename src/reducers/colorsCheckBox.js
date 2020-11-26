const colorsCheckBoxReducer = (state = [], action) => {
     switch (action.type) {
          case "COLORS_CHECKBOX_CHECKED":
               if (state.includes(action.payload)) {
                    return state.filter(r => r !== action.payload)
               }
               else {
                    return [...state, action.payload].sort()
               }
          default:
               return state
     }
}
export default colorsCheckBoxReducer
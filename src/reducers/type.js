const typeReducer = (state = "Any type", action) => {
   switch (action.type) {
      case "SELECT_TYPE":
         return action.payload;
      default:
         return state;
   }
};
export default typeReducer;

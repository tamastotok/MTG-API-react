const isClickedReducer = (state = false, action) => {
   switch (action.type) {
      case "SET_IS_CLICKED":
         return action.payload;
      default:
         return state;
   }
};
export default isClickedReducer;

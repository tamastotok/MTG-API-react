import { COLORS_CHECKBOX_CHECKED, COLORS_CHECKBOX_RESET } from "../constants";

export const colorsCheckBox = (index) => {
   return {
      type: COLORS_CHECKBOX_CHECKED,
      payload: index,
   };
};

export const resetColorsCheckBox = () => {
   return {
      type: COLORS_CHECKBOX_RESET,
   };
};

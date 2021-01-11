export const colorsCheckBox = (index) => {
     return {
          type: "COLORS_CHECKBOX_CHECKED",
          payload: index
     }
}

export const resetColorsCheckBox = () => {
     return {
          type: "COLORS_CHECKBOX_RESET"
     }
}
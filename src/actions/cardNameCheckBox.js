export const cardNameCheckBox = (bool) => {
     return {
          type: "CARDNAME_CHECKBOX_CHECKED",
          payload: bool
     }
}

export const cardNameCheckBoxOppositeState = () => {
     return {
          type: "CARDNAME_CHECKBOX_OPPOSITE_STATE"
     }
}
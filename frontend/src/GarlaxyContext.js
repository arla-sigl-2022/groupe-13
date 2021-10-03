import React from "react";

export const initialState = {
  ressources: [],
  panier: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "AJOUT_ITEM_AU_PANIER":
      const alreadyExists = state.panier.find(function (item) {
        return item.id === action.item.id;
      });
      return {
        ...state,
        panier: alreadyExists ? state.panier : state.panier.concat(action.item),
      };
    case "SUPPRIMER_ITEM_DU_PANIER":
      return {
        ...state,
        panier: state.panier.filter(function (item) {
          return item.id !== action.item.id;
        }),
      };
    case "RESSOURCES_ARRIVEES":
      return {
        ...state,
        ressources: action.ressources
      }
    default:
      return state;
  }
}

export const GarlaxyContext = React.createContext();

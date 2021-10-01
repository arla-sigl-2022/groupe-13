import React from "react";

export const initialState = {
  ressources: [
    { id: 1, planete: "Marlax", ressource: "Arlaminium", prix: 0.73 },
    { id: 2, planete: "Sarlax", ressource: "Arlium", prix: 3.25 },
    { id: 3, planete: "Larlune", ressource: "Rarladium", prix: 1.42 },
  ],
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
    default:
      return state;
  }
}

export const GarlaxyContext = React.createContext();

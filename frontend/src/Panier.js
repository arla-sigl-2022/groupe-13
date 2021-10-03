import React from "react";
import { GarlaxyContext } from "./GarlaxyContext";

export function Panier() {
  const { state, dispatch } = React.useContext(GarlaxyContext);
  const panierItemList = state ? state.panier : [];

  return (
    <div className="panier">
      <h1>Panier</h1>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>Planète</th>
            <th>Ressource</th>
            <th>Prix (Bitcoin / tonne)</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {panierItemList.map(function (item, idx) {
            return (
              <tr key={idx}>
                <td>{item.planete}</td>
                <td>{item.ressource}</td>
                <td>{item.prix}</td>
                <td>
                  <button
                    className="pure-button"
                    onClick={function () {
                      dispatch({
                        type: "SUPPRIMER_ITEM_DU_PANIER",
                        item: item,
                      });
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

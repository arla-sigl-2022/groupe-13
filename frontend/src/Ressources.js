import React from "react";
import { GarlaxyContext } from "./GarlaxyContext";

export function Ressources() {
  const { state, dispatch } = React.useContext(GarlaxyContext);
  const resourceList = state ? state.ressources : [];

  return (
    <div className="ressources">
      <h1>Ressources</h1>
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
          {resourceList.map(function (item, idx) {
            return (
              <tr key={idx}>
                <td>{item.planete}</td>
                <td>{item.ressource}</td>
                <td>{item.prix}</td>
                <td>
                  <button
                    className="pure-button button-primary"
                    onClick={function () {
                      dispatch({ type: "AJOUT_ITEM_AU_PANIER", item: item });
                    }}
                  >
                    Acheter
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

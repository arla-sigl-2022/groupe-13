import React from "react";

export function Ressources() {
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
          <tr>
            <td>Sarlax</td>
            <td>Arlium</td>
            <td>3,25</td>
            <td>
              <button className="pure-button button-primary">Acheter</button>
            </td>
          </tr>
          <tr>
            <td>Sarlax</td>
            <td>Arlium</td>
            <td>3,25</td>
            <td>
              <button className="pure-button button-primary">Acheter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

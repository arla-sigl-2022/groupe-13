import React from "react";
import { Link } from "react-router-dom";
import { GarlaxyContext } from "./GarlaxyContext";

function SideMenuBase(props) {
  const {state} = React.useContext(GarlaxyContext);
  const numberOfItemInPanier = (state ? state.panier : []).length;
  const horizontalSuffix = props.smallScreen ? "-horizontal" : "";
  return (
    <div className={`garlaxy-block sidemenu${horizontalSuffix}`}>
      <div className={`pure-menu pure-menu${horizontalSuffix}`}>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <Link className="pure-menu-link" to="/">
              Ressources
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link className="pure-menu-link" to="/panier">
              Panier <span className="badge">{numberOfItemInPanier}</span>
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link className="pure-menu-link" to="/commandes">
              Commandes
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link className="pure-menu-link" to="/contractors">
              Contractors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function SideMenuSmallScreen() {
  return <SideMenuBase smallScreen={true}></SideMenuBase>;
}

export function SideMenu() {
  return <SideMenuBase></SideMenuBase>;
}

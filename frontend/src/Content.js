import React from "react";
import { SideMenu, SideMenuSmallScreen } from "./SideMenu";
import { Ressources } from "./Ressources";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Panier } from "./Panier";
import { Commandes } from "./Commandes";

export function Content() {
  return (
    <Router>
      <div className="content">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-4 pure-u-lg-1-5 pure-u-xl-1-6">
            <SideMenu />
            <SideMenuSmallScreen />
          </div>
          <div className="pure-u-1 pure-u-md-3-4 pure-u-lg-4-5 pure-u-xl-5-6">
            <div className="garlaxy-block main">
              <Switch>
                <Route path="/panier">
                  <Panier></Panier>
                </Route>
                <Route path="/commandes">
                  <Commandes></Commandes>
                </Route>
                <Route path="/">
                  <Ressources></Ressources>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SideMenu, SideMenuSmallScreen } from "./SideMenu";
import { Ressources } from "./Ressources";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Panier } from "./Panier";
import { Commandes } from "./Commandes";
import { GarlaxyContext } from "./GarlaxyContext";

export function Content() {
  const { dispatch } = React.useContext(GarlaxyContext);
  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    async function getResources() {
      const token = await getAccessTokenSilently();
      const apiResponse = await fetch(
        "https://api.groupe13.arla-sigl.fr/v1/resource?page=1&limit=10",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const resourcesDocument = await apiResponse.json();
      dispatch({
        type: "RESSOURCES_ARRIVEES",
        ressources: resourcesDocument.resources,
      });
    }
    getResources();
  }, [dispatch]);

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

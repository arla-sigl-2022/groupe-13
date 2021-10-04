import "./App.css";
import React from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { GarlaxyContext, initialState, reducer } from "./GarlaxyContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { Authenticated } from "./Authenticated";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Auth0Provider
      clientId="KB3fxuCbW3T08YzcMYh0kSCFCr8dGLY9"
      domain="garlaxy-groupe-13.eu.auth0.com"
      redirectUri={window.location.origin}
      audience="https://api.groupe13.arla-sigl.fr"
      cacheLocation="localstorage"
    >
      <Authenticated>
        <GarlaxyContext.Provider value={{ state, dispatch }}>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </GarlaxyContext.Provider>
      </Authenticated>
    </Auth0Provider>
  );
}

export default App;

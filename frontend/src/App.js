import "./App.css";
import React from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { GarlaxyContext, initialState, reducer } from "./GarlaxyContext";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GarlaxyContext.Provider value={{ state, dispatch }}>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </GarlaxyContext.Provider>
  );
}

export default App;

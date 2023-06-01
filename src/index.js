import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SearchState from "../src/Context/searchState";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
  <React.StrictMode>
    <SearchState>
      <GoogleOAuthProvider clientId="382198177223-jlbm244os8uh02ggh50dcj7dlnc0fi93.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </SearchState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

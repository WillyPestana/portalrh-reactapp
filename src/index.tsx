import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(
  "%c⛔⚠️ ESPERE ⚠️😱",
  `color:red;
   font-size:35px; 
   font-family:'roboto';  
   padding: 40px 45px;    
   `
);

console.log(
  `%cEste é um recurso de navegador voltado para desenvolvedores. Se alguém disse para você copiar e colar algo aqui para ativar um recurso do Portal RH ou "invadir" a conta de outra pessoa, isso é uma fraude e você dará a ele acesso à sua conta.`,
  `font-size:18px; 
   font-family:'roboto';
   `
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

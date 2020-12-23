
import './app.css';

import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch} from "react-router-dom";

//import pages
import Home from "./pages/Home.js";
import Account from "./pages/Account.js";
import Trades from "./pages/Trades.js";
import LinkStrategy from "./pages/LinkStrategy.js";


var hist = createBrowserHistory();

export default function App() {
  return (
    <BrowserRouter history={hist}>   
        <Switch>
            <Route path="/link-strategy" component={LinkStrategy} />
            <Route path="/trades" component={Trades} />
            <Route path="/account" component={Account} />
            <Route path="/" component={Home} />
        </Switch>
    </BrowserRouter>
  );
}


import React from "react";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Quote from "./pages/Quote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PriceHistory from "./pages/PriceHistory";
import { getSession, logOut } from "./helpers";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stocks">Stocks</Link>
          </li>
          <li>
            <Link to="/quote">Quote</Link>
          </li>
          <li>
            <Link to="/pricehistory">Price History (Restricted)</Link>
          </li>
          {getSession() ? (
            <div>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/stocks">
          <Stocks />
        </Route>
        <Route path="/quote">
          <Quote />
        </Route>
        <Route
          path="/pricehistory"
          render={() =>
            getSession() ? <PriceHistory /> : <Redirect to="/login" />
          }
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route
          path="/logout"
          render={() => {
            logOut();
            history.push("/home");
          }}
        />
      </Switch>
    </div>
  );
}

export default App;

import React from "react";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Quote from "./pages/Quote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PriceHistory from "./pages/PriceHistory";
import { getSession, logOut } from "./helpers";
import { Button } from "@material-ui/core";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Button component={Link} to="/">
              Home
            </Button>
          </li>
          <li>
            <Button component={Link} to="/stocks">
              Stocks
            </Button>
          </li>
          <li>
            <Button component={Link} to="/quote">
              Quote
            </Button>
          </li>
          <li>
            <Button component={Link} to="/pricehistory">
              Price History (Restricted)
            </Button>
          </li>
          {getSession() ? (
            <div>
              <li>
                <Button component={Link} to="/logout">
                  Logout
                </Button>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Button component={Link} to="/login">
                  Login
                </Button>
              </li>
              <li>
                <Button component={Link} to="/register">
                  Register
                </Button>
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

import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

import Calendar from "./components/Calendar";
import CalendarMonth from "./components/CalendarMonth";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Calendar>
        <HashRouter>
          <Switch>
            <Route component={CalendarMonth} path="/:year/:month" />
            <Route component={CalendarMonth} exact path="/" />
          </Switch>
        </HashRouter>
      </Calendar>
    );
  }
}

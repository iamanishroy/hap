import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./style/main.css";
import Header from "./components/Header";
import BatchChooser from "./components/BatchChooser";
import Happenings from "./components/Happenings";
import { localStorage } from "window-or-global";
function App() {
  const history = useHistory();
  if (localStorage.getItem('batch')) {
    history.push("/timetable");
  }
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={BatchChooser} />
        <Route exact path="/timetable" component={Happenings} />
      </Switch>
    </>
  );
}

export default App;

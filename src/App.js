import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./style/main.css";
import Header from "./components/Header/Header";
import BatchChooser from "./components/Batch/BatchChooser";
import Happenings from "./components/Happening/Happenings";
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

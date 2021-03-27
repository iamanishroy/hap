import React from "react";
import "./style/main.css";
import Header from "./components/Header";
import BatchChooser from "./components/BatchChooser";
// import Happenings from "./components/Happenings";
function App() {
  return (
    <>
      <Header />
      <BatchChooser />
      {/* <Happenings /> */}
    </>
  );
}

export default App;

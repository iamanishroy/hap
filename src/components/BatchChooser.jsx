import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { localStorage } from "window-or-global";
import { hapDatabase } from "../firebase/config";
import axios from "axios";
import "../style/BatchChooser.css";

const BatchChooser = () => {
  const history = useHistory();
  const setBatch = (batchID, batchName) => {
    localStorage.setItem("batch", batchID);
    localStorage.setItem("batchName", batchName);
    history.push("/timetable");
  };

  const [batchList, setBatchList] = useState();

  useEffect(() => {
    if (localStorage.getItem("batchList")) {
      return setBatchList(JSON.parse(localStorage.getItem("batchList")));
    }
    hapDatabase.ref("batchList").once("value", function (snapshot) {
      if (snapshot.val()) {
        setBatchList(snapshot.val());
        localStorage.setItem("batchList", JSON.stringify(snapshot.val()));
      } else {
        axios({
          method: "post",
          url: "https://leather-knowledgeable-trombone.glitch.me/batch",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            setBatchList(response.data);
            localStorage.setItem("batchList", JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <>
      {batchList ? (
        <>
          <div className="batchOptionsContainer">
            <div className="options">
              {Object.keys(batchList).map((id) => (
                <>
                  <div
                    key={id}
                    onClick={() => setBatch(id, batchList[id])}
                    className="option"
                  >
                    {batchList[id]}
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="batchOptionsContainer">
          <div className="options">
            <div className="loader" style={{ marginTop: "unset" }}>
              <div className="clock">
                <div className="minutes"></div>
                <div className="hours"></div>
              </div>
              <div className="txt">loading</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatchChooser;

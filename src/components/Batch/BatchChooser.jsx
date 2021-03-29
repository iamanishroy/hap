import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { localStorage } from "window-or-global";
import "./../../style/BatchChooser.css";
import fetchBatch from "../../adapters/fetchBatch";

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
    fetchBatch().then((res) => {
      if (res !== 0) {
        setBatchList(res);
        localStorage.setItem("batchList", JSON.stringify(res));
      } else {
        // TODO: error
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

import React, { useState, useEffect } from "react";
import { localStorage } from "window-or-global";
import "./../../style/BatchChooser.css";
import fetchBatch from "../../adapters/fetchBatch";
import Loader from "../common/Loader";
import Batch from "./components/Batch";

const BatchChooser = () => {
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
                <Batch id={id} batchName={batchList[id]} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="batchOptionsContainer">
          <div className="options">
            <Loader mtu={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default BatchChooser;

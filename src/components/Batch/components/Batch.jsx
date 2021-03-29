import React from "react";
import { useHistory } from "react-router-dom";

const Batch = ({ id, batchName }) => {
  const history = useHistory();

  const setBatch = (batchID, batchName) => {
    localStorage.setItem("batch", batchID);
    localStorage.setItem("batchName", batchName);
    history.push("/timetable");
  };
  return (
    <div key={id} onClick={() => setBatch(id, batchName)} className="option">
      {batchName}
    </div>
  );
};
export default Batch;

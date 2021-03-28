import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { localStorage } from "window-or-global";
import { hapDatabase } from "../firebase/config";
import axios from "axios";
import "../style/BatchChooser.css";

const BatchChooser = () => {
  const history = useHistory();
  const setBatch = (batchID) => {
    localStorage.setItem("batch", batchID);
    history.push("/timetable");
  };

  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (localStorage.getItem("batchList")) {
      return setSchedule(JSON.parse(localStorage.getItem("batchList")));
    }
    hapDatabase.ref("batchList").once("value", function (snapshot) {
      if (snapshot.val()) {
        setSchedule(snapshot.val());
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
            setSchedule(response.data);
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
      {schedule ? (
        <>
          <div className="batchOptionsContainer">
            <div className="options">
              {Object.keys(schedule).map((id) => (
                <>
                  <div key={id} onClick={() => setBatch(id)} className="option">
                    {schedule[id]}
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

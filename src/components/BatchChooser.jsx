import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Request from "axios-react";
import { hapDatabase } from "../firebase/config";
import "../style/BatchChooser.css";
import { localStorage } from "window-or-global";
const BatchChooser = () => {
  const history = useHistory();
  const setBatch = (batchID) => {
    localStorage.setItem("batch", batchID);
    history.push("/timetable");
  };

  const [schedule, setSchedule] = useState();
  const [fbChecked, setFbChecked] = useState(false);

  useEffect(() => {
    hapDatabase.ref("batchList").once("value", function (snapshot) {
      if (snapshot.val()) {
        setSchedule(snapshot.val());
      } else {
        setFbChecked(true);
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
      ) : fbChecked ? (
        <Request
          config={{
            method: "post",
            url: "https://leather-knowledgeable-trombone.glitch.me/batch",
            headers: {
              "Content-Type": "application/json",
            },
          }}
        >
          {({ loading, response, error, refetch, networkStatus }) => (
            <>
              {loading ? (
                <div className="loader">
                  <div className="clock">
                    <div className="minutes"></div>
                    <div className="hours"></div>
                  </div>
                  <div className="txt">loading</div>
                </div>
              ) : (
                <></>
              )}
              {!loading && error && (
                <p>error: {error.response.data.errors[0]}</p>
              )}
              <div className="batchOptionsContainer">
                <div className="options">
                  {!loading &&
                    response &&
                    Object.keys(response.data).map((id) => (
                      <>
                        <div
                          key={id}
                          onClick={() => setBatch(id)}
                          className="option"
                        >
                          {response.data[id]}
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </>
          )}
        </Request>
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

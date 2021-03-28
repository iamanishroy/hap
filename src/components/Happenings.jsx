import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Request from "axios-react";
import { hapDatabase } from "../firebase/config";
import "../style/Happenings.css";
import "../style/clockLoading.css";
import { localStorage } from "window-or-global";
const Happenings = () => {
  const history = useHistory();
  if (!localStorage.getItem("batch")) {
    history.push("/");
  }
  var dateObj = new Date();
  var day = 26; // dateObj.getUTCDate();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var year = dateObj.getUTCFullYear();
  var data = JSON.stringify({
    day: day,
    month: month,
    year: year,
    batchID: localStorage.getItem("batch"),
  });

  // TODO: Add localstorage

  const [schedule, setSchedule] = useState();
  const [fbChecked, setFbChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("batch")) {
      var batch = localStorage.getItem("batch");
      hapDatabase
        .ref(`batch/${batch}/${day}-${month}-${year}`)
        .once("value", function (snapshot) {
          if (snapshot.val()) {
            setSchedule(snapshot.val());
          } else {
            setFbChecked(true);
          }
        });
    }
  }, [day, month, year]);

  const getHrDiff = (hm) => {
    var t = parseFloat(`${hm.split(":")[0]}.${hm.split(":")[1]}`);
    var n = parseFloat(`${+new Date().getHours()}.${+new Date().getMinutes()}`);

    return n - t >= 0.0 && n - t <= 1.0;
  };
  return (
    <>
      <div className="calendar light">
        <div className="calendar_header">
          {/* <h1 className="header_title">Welcome Back</h1> */}
          <p className="header_copy"> Today's Plan</p>
        </div>
        <div className="calendar_plan">
          <div className="cl_plan">
            <div className="cl_title">Today</div>
            <div className="cl_copy">
              {day}th March {year}
            </div>
            <div className="cl_add">
              {/* <i className="fas fa-plus"></i> */}
            </div>
          </div>
        </div>
        <div className="calendar_events">
          <p className="ce_title">Upcoming Events</p>
          <div className="optionsContainer">
            <div className="options">
              {schedule ? (
                <>
                  {Object.keys(schedule).map((id) => (
                    <>
                      <div key={id} className="event_item">
                        {+new Date().getUTCDate() !== day &&
                        +new Date().getUTCMonth() + 1 === month &&
                        +new Date().getUTCFullYear() === year &&
                        getHrDiff(id) ? (
                          <div className="ei_Dot dot_active"></div>
                        ) : (
                          <div className="ei_Dot"></div>
                        )}
                        <div className="ei_Title">{id}</div>
                        <div className="ei_Copy">{schedule[id]}</div>
                      </div>
                    </>
                  ))}
                </>
              ) : fbChecked ? (
                <Request
                  config={{
                    method: "post",
                    url:
                      "https://leather-knowledgeable-trombone.glitch.me/timetable",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    data: data,
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
                      <>
                        {!loading &&
                          response &&
                          Object.keys(response.data).map((id) => (
                            <div key={id} className="event_item">
                              {+new Date().getUTCDate() !== day &&
                              +new Date().getUTCMonth() + 1 === month &&
                              +new Date().getUTCFullYear() === year &&
                              getHrDiff(id) ? (
                                <div className="ei_Dot dot_active"></div>
                              ) : (
                                <div className="ei_Dot"></div>
                              )}
                              <div className="ei_Title">{id}</div>
                              <div className="ei_Copy">{schedule[id]}</div>
                            </div>
                          ))}
                      </>
                    </>
                  )}
                </Request>
              ) : (
                <div className="loader">
                  <div className="clock">
                    <div className="minutes"></div>
                    <div className="hours"></div>
                  </div>
                  <div className="txt">loading</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Happenings;

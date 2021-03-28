import React from "react";
import { useHistory } from "react-router-dom";
import Request from "axios-react";
import "../style/Happenings.css";
import "../style/clockLoading.css";
import { localStorage } from "window-or-global";
const Happenings = () => {
  const history = useHistory();
  if (!localStorage.getItem("batch")) {
    history.push("/");
  }
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = 30; //dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var data = JSON.stringify({
    day: day,
    month: month,
    year: year,
    batchID: localStorage.getItem("batch"),
  });
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
          <Request
            config={{
              method: "post",
              url: "https://fantasy-quickest-child.glitch.me/timetable",
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
                <div className="optionsContainer">
                  <div className="options">
                    {!loading &&
                      response &&
                      Object.keys(response.data).map((id) => (
                        <>
                          <div className="event_item">
                            <div className="ei_Dot"></div>
                            <div className="ei_Title">{id}</div>
                            <div className="ei_Copy">{response.data[id]}</div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </>
            )}
          </Request>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Happenings;

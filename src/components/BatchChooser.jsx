import React from "react";
import { useHistory } from "react-router-dom";
import Request from "axios-react";
import "../style/BatchChooser.css";
import { localStorage } from "window-or-global";
const BatchChooser = () => {
  const history = useHistory();
  const setBatch = (batchID) => {
    localStorage.setItem("batch", batchID);
    history.push("/timetable");
  };
  return (
    <>
      <Request
        config={{
          method: "post",
          url: "https://fantasy-quickest-child.glitch.me/batch",
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
            {!loading && error && <p>error: {error.response.data.errors[0]}</p>}
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
    </>
  );
};

export default BatchChooser;

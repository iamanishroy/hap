import React from "react";

const Loader = (props) => {
  return (
    <>
      {props.mtu ? (
        <div className="loader" style={{ marginTop: "unset" }}>
          <div className="clock">
            <div className="minutes"></div>
            <div className="hours"></div>
          </div>
          <div className="txt">loading</div>
        </div>
      ) : (
        <div className="loader">
          <div className="clock">
            <div className="minutes"></div>
            <div className="hours"></div>
          </div>
          <div className="txt">loading</div>
        </div>
      )}
    </>
  );
};

export default Loader;

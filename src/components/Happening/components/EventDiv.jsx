import React from "react";

const EventDiv = ({ id, day, month, year, eventName }) => {
  const getHrDiff = (hm) => {
    var t = parseFloat(`${hm.split(":")[0]}.${hm.split(":")[1]}`);
    var n = parseFloat(`${+new Date().getHours()}.${+new Date().getMinutes()}`);

    return n - t >= 0.0 && n - t <= 1.0;
  };
  return (
    <div key={id} className="event_item">
      {+new Date().getDate() === day &&
      +new Date().getMonth() + 1 === month &&
      +new Date().getFullYear() === year &&
      getHrDiff(id) ? (
        <div className="ei_Dot dot_active"></div>
      ) : (
        <div className="ei_Dot"></div>
      )}
      <div className="ei_Title">{id}</div>
      <div className="ei_Copy">{eventName}</div>
    </div>
  );
};
export default EventDiv;

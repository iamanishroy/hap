import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Date, localStorage } from "window-or-global";
import $ from "jquery";
import "jquery-ui-bundle";
import { BackIcon, Calender } from "../common/Logo";
import "./../../style/Happenings.css";
import "./../../style/clockLoading.css";
import "./../../style/calender.css";
import Occasion from "../Batch/components/Occasion";
import fetchTimeTable from "../../adapters/fetchTimeTable";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Happenings = () => {
  const history = useHistory();
  if (!localStorage.getItem("batch")) {
    history.push("/");
  }
  var dateObj = new Date();
  const [day, setDay] = useState(dateObj.getUTCDate());
  const [month, setMonth] = useState(dateObj.getUTCMonth() + 1); //months from 1-12
  const [year, setYear] = useState(dateObj.getUTCFullYear());

  const [schedule, setSchedule] = useState();

  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      duration: "fast",
      onSelect: function (d, i) {
        setDay(i.selectedDay);
        setMonth(i.selectedMonth + 1);
        setYear(i.selectedYear);
      },
    });
  });

  const getDayName = (day, month, year) => {
    if (
      dateObj.getUTCFullYear() === year &&
      dateObj.getUTCMonth() + 1 === month &&
      dateObj.getUTCDate() === parseInt(day)
    )
      return "Today";
    if (
      dateObj.getUTCFullYear() === year &&
      dateObj.getUTCMonth() + 1 === month &&
      dateObj.getUTCDate() + 1 === parseInt(day)
    )
      return "Tomorrow";
    var baseDate = new Date(Date.UTC(year, month - 1, day));
    return baseDate.toLocaleDateString("en-US", { weekday: "long" });
  };

  useEffect(() => {
    if (localStorage.getItem("batch")) {
      setSchedule(null);
      var batch = localStorage.getItem("batch");
      var dateObj = new Date();
      var localVarName = `${batch}_${dateObj.getUTCFullYear()}_${
        dateObj.getUTCMonth() + 1
      }_${dateObj.getUTCDay()}_${year}_${month}_${day}`;

      if (localStorage.getItem(localVarName)) {
        return setSchedule(JSON.parse(localStorage.getItem(localVarName)));
      } else {
        fetchTimeTable(day, month, year, batch).then((res) => {
          if (res !== 0) {
            setSchedule(res);
            localStorage.setItem(localVarName, JSON.stringify(res));
          } else {
            // err
          }
        });
      }
    }
  }, [day, month, year]);

  const getHrDiff = (hm) => {
    var t = parseFloat(`${hm.split(":")[0]}.${hm.split(":")[1]}`);
    var n = parseFloat(`${+new Date().getHours()}.${+new Date().getMinutes()}`);

    return n - t >= 0.0 && n - t <= 1.0;
  };
  const getExt = (n) => {
    var ext = ["st", "nd", "rd"];
    return n > 4 ? "th" : ext[n - 1];
  };
  const goToBatch = () => {
    history.push("/");
    localStorage.removeItem("batch");
  };
  return (
    <>
      <div className="calendar light">
        <div className="calendar_header">
          {/* <h1 className="header_title">Welcome Back</h1> */}
          <p className="header_copy">
            <b onClick={goToBatch}>
              <BackIcon />
            </b>
            <span>{localStorage.getItem("batchName")}</span>
          </p>
          <div className="wrapper">
            <input
              type="text"
              id="datepicker"
              defaultValue={new Date()}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="calendar_plan">
          <div className="cl_plan">
            <div
              className="cl_add"
              onClick={() => {
                document.querySelector("#datepicker").focus();
              }}
            >
              {/* 📅 */}
              <Calender />
            </div>
            <div className="cl_title">{getDayName(day, month, year)}</div>
            <div className="cl_copy">
              {day + getExt(parseInt(day))} {monthName[month - 1]} {year}
            </div>
            <Occasion />
          </div>
        </div>
        <div className="calendar_events">
          <p className="ce_title">Your Schedule</p>
          <div className="optionsContainer">
            <div className="options">
              {schedule ? (
                <>
                  {Object.keys(schedule).map((id) => (
                    <>
                      <div key={id} className="event_item">
                        {+new Date().getUTCDate() === day &&
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
    </>
  );
};

export default Happenings;

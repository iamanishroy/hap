import React from "react";
// import puppeteer from "puppeteer";
import "../style/Happenings.css";
const Happenings = () => {
//   console.log(fetchTimeTable(26, 3, 2021, "A"));
  return (
    <>
      {/* <div class="container"> */}
      <div class="calendar light">
        <div class="calendar_header">
          {/* <h1 class="header_title">Welcome Back</h1> */}
          <p class="header_copy"> Today's Plan</p>
        </div>
        <div class="calendar_plan">
          <div class="cl_plan">
            <div class="cl_title">Today</div>
            <div class="cl_copy">22nd April 2018</div>
            <div class="cl_add">{/* <i class="fas fa-plus"></i> */}</div>
          </div>
        </div>
        <div class="calendar_events">
          <p class="ce_title">Upcoming Events</p>
          <div class="event_item">
            <div class="ei_Dot dot_active"></div>
            <div class="ei_Title">10:30 am</div>
            <div class="ei_Copy">Monday briefing with the team</div>
          </div>
          <div class="event_item">
            <div class="ei_Dot"></div>
            <div class="ei_Title">12:00 pm</div>
            <div class="ei_Copy">Lunch for with the besties</div>
          </div>
          <div class="event_item">
            <div class="ei_Dot"></div>
            <div class="ei_Title">13:00 pm</div>
            <div class="ei_Copy">
              Meet with the client for final design <br /> @foofinder
            </div>
          </div>
          <div class="event_item">
            <div class="ei_Dot"></div>
            <div class="ei_Title">14:00 pm</div>
            <div class="ei_Copy">
              Meet with the client for final design <br /> @foofinder
            </div>
          </div>
          <div class="event_item">
            <div class="ei_Dot"></div>
            <div class="ei_Title">14:30 am</div>
            <div class="ei_Copy">Plan event night to inspire students</div>
          </div>
          <div class="event_item">
            <div class="ei_Dot"></div>
            <div class="ei_Title">15:30 am</div>
            <div class="ei_Copy">Add some more events to the calendar</div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Happenings;

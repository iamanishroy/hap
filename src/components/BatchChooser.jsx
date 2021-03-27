import React from "react";
import axios from "axios";
import "../style/BatchChooser.css";
const fet = () => {
  // var data = JSON.stringify({
  //   name: "Alpha",
  //   to: "anishroy212@gmail.com",
  //   subject: "test!!!",
  //   emailBody: "HELLO WORLD",
  // });

  // var config = {
  //   method: "post",
  //   url: "https://fantasy-quickest-child.glitch.me/batch",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   // data: data,
  // };

  axios
    .get("https://fantasy-quickest-child.glitch.me/batch")
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const BatchChooser = () => {
  return (
    <>
      <div className="optionsContainer">
        <div className="options">
          <div className="option" onClick={fet}>
            BCA Sem II
          </div>
          <div className="option">BCA Sem IV</div>
          <div className="option">BCA Sem VI</div>
          <div className="option">BCA Sem II</div>
          <div className="option">BCA Sem IV</div>
          <div className="option">BCA Sem VI</div>
          <div className="option">BCA Sem II</div>
        </div>
      </div>
    </>
  );
};

export default BatchChooser;

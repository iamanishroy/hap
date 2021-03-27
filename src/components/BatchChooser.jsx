import React from "react";
import Request from "axios-react";
import "../style/BatchChooser.css";
// const fet = () => {
//   // var data = JSON.stringify({
//   //   name: "Alpha",
//   //   to: "anishroy212@gmail.com",
//   //   subject: "test!!!",
//   //   emailBody: "HELLO WORLD",
//   // });

//   var config = {
//     method: "post",
//     url: "https://fantasy-quickest-child.glitch.me/batch",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
const BatchChooser = () => {
  return (
    <>
      <Request
        config={{
          method: "post",
          url: "https://fantasy-quickest-child.glitch.me/batch",
          headers: {
            "Content-Type": "application/json",
          },
          // data: data,
        }}
      >
        {({ loading, response, error, refetch, networkStatus }) => (
          <>
            {loading ? (
              <>
                <span>FETCHING...</span>
              </>
            ) : (
              <></>
            )}
            {!loading && error && <p>error: {error.response.data.errors[0]}</p>}
            <div className="optionsContainer">
              <div className="options">
                {!loading &&
                  response &&
                  Object.keys(response.data).map((id) => (
                    <>
                      <div key={id} className="option">
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

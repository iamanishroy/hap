import React, { useState, useEffect } from "react";
import { Festival, IndianFlag } from "../../common/Logo";
import data from "./helper/festData.json";

const Occasion = ({ day, month, year }) => {
  const [oca, setOca] = useState();
  useEffect(() => {
    setOca(null);
    data.forEach((oc) => {
      if (
        oc.date.datetime.day === parseInt(day) &&
        oc.date.datetime.month === month &&
        oc.date.datetime.year === year
      ) {
        setOca(oc);
      }
    });
  }, [day, month, year]);

  return (
    <>
      {oca && (
        <div className="fest">
          <Festival />
          <span>{oca.name}</span>
          {oca.type.includes("National holiday") && <IndianFlag />}
        </div>
      )}
    </>
  );
};

export default Occasion;

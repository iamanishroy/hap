import React from "react";
import { Festival, IndianFlag } from "../../common/Logo";
const Occasion = () => {
  // TODO: Search for occasion
  return (
    <div className="fest">
      <Festival />
      <span>Independence Day</span>
      {/* 🇮🇳 */}
      <IndianFlag />
    </div>
  );
};

export default Occasion;

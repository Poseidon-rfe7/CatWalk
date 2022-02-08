import React from "react";

const ReturnToTop = () => {
  return (
    <div id="return-button">
      <i
        className=" returnToTop fas fa-stopwatch"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default ReturnToTop;

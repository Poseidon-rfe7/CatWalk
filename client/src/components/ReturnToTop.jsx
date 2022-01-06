import React from "react";

const ReturnToTop = () => {
  return (
    <div id="return-button">

      <i
        className=" returnToTop fas fa-cat"
        onClick={() => {
          document.getElementById("app").scrollIntoView();
        }}
      />
    </div>
  );
};

export default ReturnToTop;

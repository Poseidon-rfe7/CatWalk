import React from "react";

const Progressbar = ({
  bgcolor,
  min,
  max,
  height,
  width,
  showIcon,
  showBar,
}) => {
  let progress = (min / max) * 100;
  let isIconVisible = showIcon ? "block" : "none";
  let isBarVisible = showBar ? "block" : "none";
  let isBgVisible = showIcon ? "whitesmoke" : bgcolor;
  let isMargin = showIcon ? "10" : "0";

  const Parentdiv = {
    height: height,
    width: `${width}%`,
    backgroundColor: "whitesmoke",
    borderRadius: 3,
    margin: 0,
    marginBottom: `${isMargin}px`,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: isBgVisible,
    borderRadius: 3,
    textAlign: "right",
    display: isBarVisible,
  };

  const progresstext = {
    color: "black",
    fontWeight: 900,
    display: isIconVisible,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>&#x25B2;</span>
      </div>
    </div>
  );
};

export default Progressbar;

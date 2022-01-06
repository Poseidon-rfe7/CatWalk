import React from 'react';

const Progressbar = ({bgcolor, min, max, height, width}) => {
  let progress = min / max * 100;

  const Parentdiv = {
      height: height,
      width: `${width}%`,
      backgroundColor: 'whitesmoke',
      borderRadius: 3,
      margin: 0
    }

    const Childdiv = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
      borderRadius: 3,
      textAlign: 'right'
    }

    const progresstext = {
      padding: 10,
      color: 'black',
      fontWeight: 900
    }

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        {/* <span style={progresstext}>{`${progress}%`}</span> */}
      </div>
    </div>
  )
}

export default Progressbar;


{/* <progress value={this.state.ratings['3'] || 0} max={this.state.totalRatings}>{this.state.totalRatings}%</progress> */}
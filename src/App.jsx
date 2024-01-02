import React, { useState } from "react";
import "./App.css";
import { Button, Grid } from "@mui/material";

function App() {
  const [timeRunning, setTimeRunning] = useState({
    hour: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [paused, setPaused] = useState(false);

  const handleStart = () => {
    const prevTime = { ...timeRunning };
    const id = setInterval(() => {
      prevTime.seconds++;
      if (prevTime.seconds === 60) {
        prevTime.seconds = 0;
        prevTime.minutes++;
      }
      if (prevTime.minutes === 60) {
        prevTime.minutes = 0;
        prevTime.hour++;
      }
      setTimeRunning({ ...prevTime });
    }, 1000);
    setTimerId(id);
  };

  const handleStop = () => {
    if (!paused) {
      timerId && clearInterval(timerId);
      setTimerId(null);
    } else {
      handleStart();
    }
    setPaused((p) => !p);
  };

  const handleReset = () => {
    setTimeRunning({
      hour: 0,
      minutes: 0,
      seconds: 0,
    });
    clearInterval(timerId);
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12}>
        <h1>Stop Watch using React.JS 🚀</h1>
      </Grid>
      <Grid item xs={12} sm={12}>
        <h1 className="time">
          <span>
            {timeRunning.hour < 10 ? "0" + timeRunning.hour : timeRunning.hour}
          </span>
          {":"}
          <span>
            {timeRunning.minutes < 10
              ? "0" + timeRunning.minutes
              : timeRunning.minutes}
          </span>
          {":"}
          <span>
            {timeRunning.seconds < 10
              ? "0" + timeRunning.seconds
              : timeRunning.seconds}
          </span>
        </h1>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          size="large"
          style={{ margin: "2px" }}
          onClick={handleStart}
        >
          Start
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ margin: "2px" }}
          onClick={handleStop}
        >
          {paused ? "Resume" : "Pause"}
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ margin: "2px" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [counterUsage, setCounterUsage] = useState({ increments: 0, resets: 0 });

  // Load stored counter usage
  useEffect(() => {
    // const storedCounterUsage = JSON.parse(localStorage.getItem("counterUsage")) || [];
    const storedMaxCounterValues = JSON.parse(localStorage.getItem("maxCounterValues")) || [];

    setCounterUsage({ increments: 0, resets: 0 }); // Reset session usage on reload
    setMaxValue(storedMaxCounterValues.length ? storedMaxCounterValues[storedMaxCounterValues.length - 1].maxValue : 0);
  }, []);

  // Background color interpolation
  const { backgroundColor } = useSpring({
    backgroundColor: `rgba(100, 181, 246, ${count / 50})`, // Linear increase
    config: { tension: 170, friction: 20 },
  });

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setCounterUsage((prev) => ({ ...prev, increments: prev.increments + 1 }));

    if (newCount > maxValue) {
      setMaxValue(newCount);
    }
  };

  const handleReset = () => {
    // Store counter usage per session
    const date = new Date().toISOString().split("T")[0];

    const storedCounterUsage = JSON.parse(localStorage.getItem("counterUsage")) || [];
    storedCounterUsage.push({ date, increments: counterUsage.increments, resets: counterUsage.resets + 1 });

    localStorage.setItem("counterUsage", JSON.stringify(storedCounterUsage));

    // Store max counter value for the session
    const storedMaxCounterValues = JSON.parse(localStorage.getItem("maxCounterValues")) || [];
    storedMaxCounterValues.push({ session: storedMaxCounterValues.length + 1, maxValue });

    localStorage.setItem("maxCounterValues", JSON.stringify(storedMaxCounterValues));

    // Reset count and reset counter usage properly
    setCount(0);
    setMaxValue(0);
    setCounterUsage({ increments: 0, resets: 0 });
  };

  return (
    <animated.div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor }}>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Counter: {count}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleIncrement} style={{ margin: "5px" }}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)} style={{ margin: "5px" }}>
          Decrement
        </Button>
        <Button variant="contained" onClick={handleReset} style={{ margin: "5px" }}>
          Reset
        </Button>
      </Container>
    </animated.div>
  );
};

export default Counter;

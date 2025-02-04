import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Background color interpolation
  const { backgroundColor } = useSpring({
    backgroundColor: `rgba(100, 181, 246, ${count / 50})`, // Linear increase
    config: { tension: 170, friction: 20 },
  });

  return (
    <animated.div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor }}>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Counter: {count}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setCount(count + 1)} style={{ margin: "5px" }}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)} style={{ margin: "5px" }}>
          Decrement
        </Button>
        <Button variant="contained" onClick={() => setCount(0)} style={{ margin: "5px" }}>
          Reset
        </Button>
      </Container>
    </animated.div>
  );
};

export default Counter;

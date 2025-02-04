import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const UserDataForm = () => {
    const [formData, setFormData] = useState({ name: "", address: "", email: "", phone: "" });
    const [isDirty, setIsDirty] = useState(false);
    const user = useSelector((state) => state.user.data); // This pulls user data from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // If user data exists, pre-fill the form fields
    useEffect(() => {
      if (user) {
        setFormData({ name: user.name || "", address: user.address || "", email: user.email || "", phone: user.phone || "" });
      }
    }, [user]);
  
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]); // `isDirty` dependency to trigger when it changes
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setIsDirty(true); // Mark form as dirty when there's a change
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userId = uuidv4();
      const userData = { id: userId, ...formData };
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(saveUserInfo(userData));
      setIsDirty(false); // After submitting, form is no longer dirty
      navigate("/editor");
    };
  
    const fadeAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });
  
    return (
      <Container component={Paper} sx={{ p: 4, mt: 4 }}>
        <animated.div style={fadeAnimation}>
          <Typography variant="h4" gutterBottom> User Data Form </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required type="email" />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required type="tel" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}> Submit </Button>
          </form>
        </animated.div>
      </Container>
    );
};
    

export default UserDataForm;

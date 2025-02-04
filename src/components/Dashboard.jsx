import Chart from "./TextEditor/Chart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../utils/userSlice"; // Redux action
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    dispatch(saveUserInfo(storedUserData))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    return (
      <div><Chart/></div>
    )
  }
  
  export default Dashboard;
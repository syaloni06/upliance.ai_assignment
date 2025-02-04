import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, Paper, MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { saveUserInfo } from "../../utils/userSlice"; // Redux action

const Editor = () => {
  const users = useSelector((state) => state.user.data); // Fetch users from Redux
  const dispatch = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState(""); // Track selected user
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Find the selected user from the users array
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;

  // Load the selected user's details when selected
  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        address: selectedUser.address || "",
      });
    } else {
      setUserData({ name: "", email: "", phone: "", address: "" });
    }
  }, [selectedUser]);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };


  // Handle field updates
  const handleUpdate = (field, value) => {
    if (!selectedUserId) return;

    const updatedUser = {
      ...selectedUser,
      [field]: value, // Update only the modified field
    };

    const updatedUsers = users.map((user) =>
      user.id === selectedUserId ? updatedUser : user
    );

    dispatch(saveUserInfo(updatedUsers)); // Update Redux store
    localStorage.setItem("userData", JSON.stringify(updatedUsers)); // Persist data

    setUserData((prev) => ({ ...prev, [field]: value })); // Update local state
  };

  // Custom toolbar for rich text editor
  const toolbarOptions = [
    [{ bold: true }, { italic: true }, { underline: true }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  return (
    <Box sx={{ width: "80%", margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Rich Text User Editor
      </Typography>

      {/* User selection dropdown */}
      <Select
        fullWidth
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select a User
        </MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {stripHtml(user.name)} {/* Show name without HTML tags */}
          </MenuItem>
        ))}
      </Select>


      {/* Rich Text Fields */}
      {["name", "email", "phone", "address"].map((field) => (
        <Paper key={field} elevation={3} sx={{ padding: "10px", mb: 2 }}>
          <Typography variant="subtitle1">{field.charAt(0).toUpperCase() + field.slice(1)}:</Typography>
          <ReactQuill
            value={userData[field]}
            onChange={(value) => handleUpdate(field, value)}
            modules={{ toolbar: toolbarOptions }}
            readOnly={!selectedUserId} // Disable if no user selected
          />
        </Paper>
      ))}
    </Box>
  );
};

export default Editor;

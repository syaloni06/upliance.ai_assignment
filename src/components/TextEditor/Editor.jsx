import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, Paper, MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { saveUserInfo } from "../../utils/userSlice"; // Redux action

const Editor = () => {
  const users = useSelector((state) => state.user.data); // Fetch users array from Redux
  const dispatch = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState(""); // Track selected user
  const [content, setContent] = useState(""); // Store user-specific content

  // Find the selected user from the users array
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;

  // Load the selected user's content when they are chosen
  useEffect(() => {
    if (selectedUser) {
      setContent((selectedUser.name || "").concat(selectedUser.address || "")); // Initialize `content` if missing
    } else {
      setContent(""); // Clear editor if no user is selected
    }
  }, [selectedUser]);

  // Handle content change
  const handleChange = (value) => {
    setContent(value);
    if (!selectedUserId) return;

    // Update only the selected user's content, keeping other properties intact
    const updatedUsers = users.map((user) =>
      user.id === selectedUserId ? { ...user, content: value } : user
    );

    dispatch(saveUserInfo(updatedUsers)); // Update Redux store
    localStorage.setItem("userData", JSON.stringify(updatedUsers)); // Persist data
  };

  // Custom toolbar options for formatting
  const toolbarOptions = [
    [{ bold: true }, { italic: true }, { underline: true }], // Text styles
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ align: [] }], // Text alignment
    ["link", "image"], // Link & Image
    ["clean"], // Clear formatting
  ];

  return (
    <Box sx={{ width: "80%", margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Rich Text Editor
      </Typography>

      {/* User selection dropdown */}
      <Select
        fullWidth
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Select a User</MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>

      <Paper elevation={3} sx={{ padding: "10px" }}>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{ toolbar: toolbarOptions }}
          readOnly={!selectedUserId} // Disable editor if no user is selected
        />
      </Paper>
    </Box>
  );
};

export default Editor;

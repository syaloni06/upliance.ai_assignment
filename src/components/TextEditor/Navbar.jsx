import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to={"/"}>Dashboard</Link>

        </Typography>
        <Link to="/counter" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
          Counter
        </Link>
        <Link to="/editor" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
          Editor
        </Link>
        <Link to="/userData" style={{ color: "white", textDecoration: "none" }}>
          UserData
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

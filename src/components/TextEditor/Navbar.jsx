import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rich Text Editor
        </Typography>
        <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
          Editor
        </Link>
        <Link to="/chart" style={{ color: "white", textDecoration: "none" }}>
          Chart
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

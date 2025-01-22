import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { logout } from "../../services/apiServices";

function Navbar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            <Link to="/">Spotify</Link>
          </Typography>
          {isLoggedIn && (
            <>
              <Button component={Link} to="/admin/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <Button component={Link} to="/login" color="inherit">
              Login / Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

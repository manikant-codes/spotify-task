import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/slices/authSlice";
import { logout } from "../../services/apiServices";

function SidebarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div className="md:block hidden p-8 border-r border-r-gray-300">
      <ul className="flex flex-col gap-4">
        <li>
          <Button
            component={Link}
            to="/admin/dashboard"
            variant="outlined"
            fullWidth
          >
            Dashboard
          </Button>
        </li>
        <li>
          <Button onClick={handleLogout} variant="outlined" fullWidth>
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default SidebarAdmin;

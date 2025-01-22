import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../redux/slices/authSlice";
import { login } from "../services/apiServices";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData) as {
        email: string;
        password: string;
      };

      const result = await login(data);

      if (!result.success) {
        return alert(result.message);
      }

      dispatch(setToken(result.token));

      alert("Logged-in successfully.");

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Something went wrong.");
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-gra border-gray-300 p-8 border min-w-[320px]"
      >
        <fieldset className="font-semibold text-2xl">Login</fieldset>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
        />
        <div>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <p className="my-1 text-center">OR</p>
          <Button component={Link} to="/register" variant="text" fullWidth>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;

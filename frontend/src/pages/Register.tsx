import { Button, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/apiServices";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData) as {
        fname: string;
        lname: string;
        email: string;
        password: string;
      };

      const result = await register(data);

      if (!result.success) {
        return alert(result.message);
      }

      alert("Registered successfully.");

      navigate("/login");
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
        <fieldset className="font-semibold text-2xl">Register</fieldset>
        <TextField
          id="fname"
          name="fname"
          label="First Name"
          type="text"
          variant="outlined"
          required
        />
        <TextField
          id="lname"
          name="lname"
          label="Last Name"
          type="text"
          variant="outlined"
          required
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          required
        />
        <div>
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
          <p className="my-1 text-center">OR</p>
          <Button component={Link} to="/login" variant="text" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;

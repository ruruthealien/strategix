import React, { useState } from "react";
import AuthLayout from "../../componets/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../componets/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token, role} = response.data;

      if(token){
        localStorage.setItem("token", token);

        // Redirect based on role
        if (role === "admin"){
          navigate("/admin/dashboard");
        } else{
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] min-h-full flex flex-col justify-start pt-45 ">
        <h3 className="text-[30px] font-semibold text-white pt-8">
          {" "}
          Welcome Back{" "}
        </h3>
        <p className="text-xs text-yellow-100 mt-[5px] mb-6">
          {" "}
          Please enter your details to log in.{" "}
        </p>

        <form onSubmit={handleLogin}>
          <div className="w-[400px] flex flex-col gap-4">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="ram2001@gmail.com"
              type="text"
              required="true"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
              required="true"
            />

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button
              type="submit"
              className="w-[400px] text-sm font-medium h-10 text-white bg-lime-300/50 shadow-lg p-[10px] rounded-md my-1 cursor-pointer hover:bg-lime-500/50 transition duration-300 ease-in-out"
            >
              LOGIN
            </button>

            <p className="text-[13px] text-yellow-200 mt-3">
              Don't have an account?{" "}
              <Link
                className="font-medium text-lime-300 underline"
                to="/signup"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

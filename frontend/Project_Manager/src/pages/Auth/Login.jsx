import React, { useState } from "react";
import AuthLayout from "../../componets/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../componets/Inputs/Input";



const Login = () => {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error, setError]= useState(null);

  const navigate = useNavigate();

// handle login form submit

const handleLogin = async(e)=>{
  e.preventDefault();

  if(!validateEmail(email)){
    setError("Please enter a valid email address");
    return;
  }

  if(!password){
    setError("Please enter a password");
    return;
  }

  setError("");

  //Login API Call
};

  return <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-[30px] font-semibold text-white"> Welcome Back </h3>
      <p className="text-xs text-yellow-100 mt-[5px] mb-6"> Please enter your details to log in. </p>

      <form onSubmit={handleLogin}>
        <Input
            value = {email}
            onChange={({target}) => setEmail(target.value)}
            label = "Email Address"
            placeholder = "john@email.com"
            type = "text"
            />

            <Input
            value = {password}
            onChange={({target}) => setPassword(target.value)}
            label = "Password"
            placeholder = "Min 8 characters"
            type = "password"
            />

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button type="submit" className="w-[500px] text-sm font-medium h-10 text-white bg-lime-300/50 shadow-lg p-[10px] rounded-md my-1 cursor-pointer hover:bg-lime-500/50 transition duration-300 ease-in-out">
              LOGIN
            </button>

            <p className="text-[13px] text-yellow-200 mt-3">
              Don't have an account? {" "}
              <Link className="font-medium text-lime-300 underline" to="/signup">
                SignUp
              </Link>
            </p>
      </form>
    </div>
  </AuthLayout>;
};

export default Login;

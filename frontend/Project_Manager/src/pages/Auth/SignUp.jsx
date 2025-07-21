import { UserContext } from '../../context/userContext';
import React, { useContext, useState } from "react";
import AuthLayout from "../../componets/layout/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../componets/Inputs/ProfilePhotoSelector";
import Input from "../../componets/Inputs/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from '../../utils/uploadImage';



const SignUp = () => {
  // creating variables
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // handle SignUp form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError("Please enter a full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //SignUp API Call
    try {

      // Upload profile picture
      if(profilePic)
      {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const {token, role} = response.data;

      if(token)
      {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if(role == "admin")
        {
          navigate("/admin/dashboard");
        }
        else
        {
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
      <div className="lg:w-[70%] min-h-full flex flex-col justify-start pt-40">
        <h3 className="text-[20px] font-semibold text-[#fef8e3] pt-6">
          Create an Account
        </h3>
        <p className="text-xs text-[#fef8e3]/70 mt-[5px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="w-[600px] grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Ram Das"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="ram2001@gmail.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 digit code"
              type="text"
            />
          </div>
          {error && <p className="text-red-00 text-xs mt-2">{error}</p>}

          <button
            type="submit"
            className="w-[290px] text-sm font-medium h-10 text-white bg-[#5E6623] shadow-lg p-[10px] rounded-md my-1 cursor-pointer hover:bg-[#78853A] transition duration-300 ease-in-out"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-yellow-200 mt-3">
            Already have an account?{" "}
            <Link className="font-medium  text-[#7C8F37] underline hover:text-[#A9BF59] transition" to="/login">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

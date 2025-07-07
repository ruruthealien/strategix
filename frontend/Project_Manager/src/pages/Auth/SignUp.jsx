import React, { useState } from 'react'
import AuthLayout from '../../componets/layout/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../componets/Inputs/ProfilePhotoSelector';

const SignUp = () => {
// creating variables
const [profilePic, setProfilePic] = useState(null);
const [fullName, setFullName] = useState("");
const [email, SetEmail] = useState("");
const [password, setPassword] = useState("");
const [adminInviteToken, setAdminInviteToken] = useState("");

const [error, setError] = useState(null); 

 // handle SignUp form submit
 const handleSignUp = async(e)=>{
   e.preventDefault();
 
   if(!fullName){
     setError("Please enter a full name");
     return;
   }

    if(!validateEmail(email)){
     setError("Please enter a valid email address");
     return;
   }
 
   if(!password){
     setError("Please enter a password");
     return;
   }
 
   setError("");
 
   //SignUp API Call
  };
  return (
    <AuthLayout>
      <div className='lg:w-[70%] min-h-full flex flex-col justify-start pt-45'>
        <h3 className='text-[30px] font-semibold text-white pt-8'>Create an Account</h3>
        <p className='text-xs text-yellow-100 mt-[5px] mb-6'>Join us today by entering your details below</p> 

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
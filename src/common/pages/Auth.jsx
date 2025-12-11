import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginAPI, loginAPI, registerAPI } from '../../Services/allAPI'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../../context/AuthContext'


function Auth({ register }) {

  const [showPasswd, setshowPasswd] = useState(false)  // to password hide and show and hide

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);
  const navigate = useNavigate()

  // context

  const { setAuthorisedUser } = useContext(userAuthContext)

  //function register

  const HandleRegister = async () => {
    const { username, email, password } = userDetails  //destructuring
    if (!username || !email || !password) {
      alert("Fill the details completely")
    } else {
      const result = await registerAPI(userDetails)  //api fron all API
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registerd Successfully`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })

      } else {
        toast.error(`Something Went wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }
  //login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info(`Fill the form completely`)
    } else {
      const result = await loginAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Login Successfully`)
        setAuthorisedUser(true)

        if (result.data.existingUser.role == "admin") {
          navigate("/admin-home")
        } else {
          navigate("/")
        }

        //  Store existinguser & token in sessionStorage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);//token is already a string 


        setUserDetails({
          email: "",
          password: ""
        })
        // navigate("/")
      } else if (result.status == 401) {
        toast.warning(result.response.data)
        setUserDetails({
          email: "",
          password: ""
        })

      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          email: "",
          password: ""
        })
      }
      else {
        toast.warning(`Something went wrong`)

        setUserDetails({
          email: "",
          password: ""
        })
      }
    }
  }

  // google login 

  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential);
    const googleData = jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try {
      const result = await googleLoginAPI({ password: "googlepassword", email: googleData.email, username: googleData.name, profile: googleData.picture })
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        toast.success("Login succesfull")
        setAuthorisedUser(true)


        if (result.data.existingUser.role == "admin") {
          navigate("/admin-home")
        } else {
          navigate("/")
        }

      } else {
        toast.error("Something Went Wrong")
      }


    } catch (error) {
      console.log(error);


    }



  }

  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(https://img.freepik.com/free-photo/close-up-view-books-flower-wooden-table_23-2148328286.jpg?semt=ais_hybrid&w=740&q=80)] bg-cover bg-center'>
        <div className='p-10'>

          <h1 className='text-3xl  font-bold text-center'>BOOKSTORE</h1>
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <Link to={"/"}><FaHome className='me-80 text-34xl mt-5' /></Link>
            <div style={{ width: "100px", height: '100px', borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaCircleUser className='text-6xl' />
            </div>
            <h1 className='text-2xl'>{register ? "Register" : "Login"}</h1>



            <form action="">
              {register &&
                <div className='my-5'>
                  <label htmlFor="">Username</label>
                  <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='username ' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />
                </div>
              }
              <div className='mt-5'>
                <label htmlFor="">Email</label>
                <input value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email ' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />
              </div>
              <div className='mt-5'>
                <label htmlFor="">Password</label>
                <div className='flex items-center'>
                  <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={showPasswd ? 'text' : 'password'} placeholder='password' className='bg-white p-2 w-full  rounded mt-2 placeholder-gray-500 text-black' />
                  {showPasswd ? <FaEye onClick={() => setshowPasswd(!showPasswd)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: "-30px" }} /> :
                    <FaEyeSlash onClick={() => setshowPasswd(!showPasswd)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: "-30px" }} />}

                </div>
              </div>
              <div className='mt-2'>
                <p className='text-xs text-orange-400'>*Never share your password with others</p>
              </div>
              <div className='mt-4'>
                {register ? <button onClick={HandleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button> :
                  <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>}
              </div>
              {/* google authentication */}
              {!register &&
                <div className='mt-5'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    useOneTap
                  />
                </div>}
              <div className='mt-3'>
                {register ? <p>Are you Already a user<Link to={"/login"} className='text-blue-400'>Login</Link></p> :
                  <p>Are you a new user<Link to={"/register"} className='text-blue-400'>Register</Link></p>}
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth
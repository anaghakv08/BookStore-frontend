import React, { useContext, useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebook, FaRegUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { toast } from 'react-toastify'
import SERVERURL from '../../Services/serverURL'
import { userAuthContext } from '../../context/AuthContext'

function Header() {

    const [listStatus, setListStatus] = useState(false)

    const [dropdownStatus, setDropdownstatus] = useState(false)

    const [token, setToken] = useState("") //for store token 

    const { userProfileUpdatestatus } = useContext(userProfileUpdateContext)
       

    // context

    const  {setAuthorisedUser} =useContext (userAuthContext)
 
    //username

    const [username, setUsername] = useState("")
    // profile

    const [userProfile, setUserProfile] = useState("")

    // console.log(token);
    // console.log(username);


    const navigate = useNavigate()
    // logout 

    const logout = () => {
        sessionStorage.clear()
        toast.success("Logout Successfull!!!")
        setAuthorisedUser(false)
        navigate("/")
    }

    console.log(userProfile);




    useEffect(() => {
        
        if (sessionStorage.getItem("token")) {

            // const token -sessionStorage.getItem("token")  or

            setToken(sessionStorage.getItem("token"))
        }
        if (sessionStorage.getItem("existingUser")) {
            const name = JSON.parse(sessionStorage.getItem("existingUser"))
            setUsername(name.username)
            const existingProfile = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserProfile(existingProfile.profile)

        }
    }, [userProfileUpdatestatus])
    return (
        <>
            <div className='grid grid-cols-3 p-3'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"100px"} height={"100px"} src="https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    {/* for responsive */}
                    <h2 className='font-bold text-2xl ms-2 md:hidden'>BOOKSTORE</h2>
                </div>
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
                </div>

                {/* login */}

                <div className='md:flex justify-end items-center hidden'>
                    <BsInstagram className='me-3 text-2xl' />
                    <FaXTwitter className='me-3 text-2xl' />
                    <FaFacebook className='me-3 text-2xl' />


                    {!token ?

                        <Link to={"/login"}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3
                    hover:bg-black hover:text-white'><FaRegUser className='me-2' />
                            Login
                        </button>
                        </Link>

                        :

                        //profile

                        <div className='relative inline-block text-left'>
                            <button onClick={() => setDropdownstatus(!dropdownStatus)}
                                className='w-full flex items-center  px-3py-2 shadow-lg hover:bg-gray-100 bg-white  '>
                                <img src={userProfile == "" ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" : userProfile.startsWith("https")? userProfile : `${SERVERURL}/imguploads/${userProfile}`} width={"50px"} height={"50px"} alt=""
                                    style={{ borderRadius: "50%" }} />
                                <p className='ms-2'>{username}</p>
                            </button>

                            {dropdownStatus &&
                                <div className='absolute right-0 z-10 mt-2 w-40 origin-top rounded-md bg-white shadow-lg '>
                                    <Link to={"/profile"} className='block px-4 py-2 text-sm text-gray-700'>Profile</Link>
                                    <Link to={"/login"} ><button onClick={logout} className='block px-4 py-2 text-sm text-gray-700'>Logout</button></Link>
                                </div>}
                        </div>
                    }
                </div>



            </div>

            <nav className='w-full  bg-gray-900 text-white p-5 md:flex justify-center items-center'>
                {/* <div className='flex justify-between items-center md:hidden '>
                    <button onClick={() => setListStatus(!listStatus)}><TiThMenu className='text-2xl' /></button>
                    <Link to={"/login"}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3
                    hover:bg-black hover:text-white'><FaRegUser className='me-2' />Login
                    </button>
                    </Link>
                </div> */}

                {/* Mobile Menu + Login/Profile */}
                <div className='flex justify-between items-center md:hidden'>
                    <button onClick={() => setListStatus(!listStatus)}>
                        <TiThMenu className='text-2xl' />
                    </button>

                    {/* MOBILE LOGIN / PROFILE */}
                    {!token ? (
                        <Link to={"/login"}>
                            <button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 bg-white text-black hover:bg-black hover:text-white'>
                                <FaRegUser /> Login
                            </button>
                        </Link>
                    ) : (
                        <div className='relative inline-block text-left'>
                            <button
                                onClick={() => setDropdownstatus(!dropdownStatus)}
                                className='w-full flex items-center px-3 py-2 bg-white text-black rounded'>
                                <img
                                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                    alt="profile"
                                    width="40"
                                    height="40"
                                    className='rounded-full'
                                />
                                <p className='ms-2'>{username}</p>
                            </button>

                            {dropdownStatus &&
                                <div className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg'>
                                    <Link to={"/profile"} className='block px-4 py-2 text-sm text-gray-800'>Profile</Link>
                                    <Link to={"/login"} className='block px-4 py-2 text-sm text-gray-800'>Logout</Link>

                                </div>
                            }
                        </div>
                    )}
                </div>


                {/* list content will be hidden on responsive */}
                <ul className={listStatus ? "flex flex-col" : 'md:flex justify-center items-center hidden'}>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/"}  >Home</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/all-books"} >Books</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/careers"} >Carrers</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/contact"} >Contact</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header

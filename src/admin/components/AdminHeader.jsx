import React from 'react'
import { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthContext } from '../../context/AuthContext'

function AdminHeader() {
  const { setAuthorisedUser } = useContext(userAuthContext)


  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    toast.success("Logout Successfull!!!")
    setAuthorisedUser(false)
    navigate("/")
  }
  return (
    <>
      {/* logo */}
      <nav className='px-5 py-3 flex items-center'>
        {/* logo */}
        <div className='flex items-center'>
          <img width={"100px"} height={"100px"} src="https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
          <h1 className='font-bold text-2xl ms-4'>BOOKSTORE</h1>
        </div>
        {/* login */}
        <div className='ms-auto'>
          <Link to={"/login"}>
            <button type='button' onClick={logout} className='flex justify-between items-center border border-black rounded px-4 py-2 ms-3 
                      hover:bg-black hover:text-white'><FaPowerOff className='me-3' />Logout</button>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default AdminHeader

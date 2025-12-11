import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookStatusAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../Services/allAPI'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)

  const [allBooks, setAllBooks] = useState([])

  const [token, setToken] = useState("")

  const [allUsers, setAllUsers] = useState([])

  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      console.log(result);
      setAllBooks(result.data);


    } catch (error) {
      console.log(error);

    }
  }

  // approve book

  const approveBook = async (id) => {
    console.log(id);
    try {
      const result = await approveBookStatusAPI(id)
      console.log(result);
      if (result.status == 200) {
        setAllBooks(result.data)
      }

    } catch (error) {
      console.log(error);

    }

  }


  // get all users

  const getAllUsers = async () => {
    try {

      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllUsers(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getAllBooks()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))

    }

  }, [])




  return (
    <>
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>All Books</h1>
          {/* tabs */}

          <div className='flex justify-center items-center my-8 font-medium text-lg'>
            {/* when click booklist /user show booklist/user */}
            <p onClick={() => {
              setUserListStatus(false), setBookListStatus(true)
            }} className={bookListStatus ?
              "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer" : 'p-4 border-b border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => {
              setUserListStatus(true), setBookListStatus(false),
                getAllUsers()
            }} className={userListStatus ?
              "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer" : 'p-4 border-b border-gray-200 cursor-pointer'}>Users</p>
          </div>

          {bookListStatus &&

            (
              <>

                <div className='md:grid grid-cols-4 w-full my-5'>
                  {allBooks?.length > 0 ?

                    allBooks?.map((book, index) => (
                      <div key={index} className='shadow-lg bg-white rounded-xl p-4 hover:shadow-xl transition m-4'>
                        <img className='w-full h-86 object-cover rounded-md' src={book?.imageUrl} alt="" />
                        <div className='flex flex-col justify-center items-center mt-4'>
                          <p className='font-semibold text-gray-800'>{book?.title}</p>
                          <p className='text-gray-600'>{book?.author}</p>
                          <p className='font-bold text-green-700 mt-2'>₹{book?.dprice}</p>


                          {book?.status == "pending" &&
                            <button type='button' onClick={() => approveBook(book?._id)} className=' w-full mt-3 p-3 rounded bg-green-700 text-white hover:border-green-600 hover:bg-white hover:text-green-700'>Approve</button>
                          }
                          {book?.status == "approved" &&
                            <div className='w-full flex justify-end'>
                              <img src="https://e7.pngegg.com/pngimages/302/913/png-clipart-approved-approved-thumbnail.png" style={{ width: "50px", borderRadius: "50%" }} alt="" />
                            </div>}
                        </div>
                      </div>
                    ))
                    :

                    <p className='text-red-700 font-semibold text-center mt-10 text-xl'>No Books Available...</p>}
                </div>
              </>)



          }


          {userListStatus &&
            (<>

              <div className='md:grid grid-cols-3 w-full my-5'>

                {allUsers?.length > 0 ?
                  allUsers?.map((userdetails, index) => (
                    <div key={index} className='shadow rounded p-2 m-2 bg-gray-200'>
                      {/* mongodb generated id _id /object id */}
                      <p className='text-red-700 font-bold'>ID :{userdetails?._id}</p> 
                      <div className='flex items-center mt-3'>
                        <img src={userdetails?.profile} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                        <div className='flex flex-col ml-3 w-full'>
                          <p className='text-blue-800 text-lg font-bold'>{userdetails?.username}</p>
                          <p>{userdetails?.email}</p>
                        </div>
                      </div>
                    </div>
                  ))


                  :

                  <p className='text-red-700 font-semibold text-center mt-10 text-xl'>No Users Available.....</p>}
              </div>
            </>

            )}
        </div>
      </div>
    </>
  )
}

export default AdminBooks

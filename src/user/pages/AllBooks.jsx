import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../Services/allAPI'

function AllBooks() {
  const [token, setToken] = useState("");

  const [allBooks, setAllBooks] = useState([])
  // category

  const [allCategory, setAllCategory] = useState([])

  const [tempBooks, setTempBooks] = useState([])
  // search  

  const [searchKey,setSearchKey]=useState("")

  console.log(searchKey);
  


  const getAllBooks = async (userToken) => {
    //reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${userToken}`
    };

    const result = await getAllBooksAPI(searchKey,reqHeader);
    console.log(result);
    setAllBooks(result.data)
    setTempBooks(result.data)
    // setAllCategory(result.data.map(item => item.category))

    const tempCategory = result.data.map(item => item.category)
    setAllCategory([...new Set(tempCategory)])
  };
  console.log(allBooks);
  console.log(allCategory);

  // category select

  const categoryFilter = (category) => {
    console.log(category);
    if (category == "No Filter") {
      setAllBooks(tempBooks)

    } else {
      setAllBooks(tempBooks.filter(item => item.category.toLowerCase() ==
        category.toLowerCase()))
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      console.log(userToken);

      setToken(userToken);
      getAllBooks(userToken);
    }
  }, [searchKey]);

  return (
    <>
      <Header />



      {token ?

        <>
          <div className="flex flex-col items-center justify-center my-5 px-4">
            <h1 className="font-bold text-3xl my-5 text-center">Collections</h1>

            <div className="flex items-center justify-center w-full max-w-md my-5">
              <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)}
                type="text"
                className="p-2 border border-gray-300 text-black w-full rounded-l placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Search by Title" />
              <button className="bg-blue-900 text-white p-2 px-5 rounded-r hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800">
                Search
              </button>
            </div>
          </div>


          <div className=' grid grid-cols-1 md:grid grid-cols-4 gap-5 md:px-20 p-5 mb-10'>

            <div className='col-span-1 p-4 rounded shadow-sm'>
              <h1 className='font-semibold text-lg' >Filters</h1>
              <div className='space-y-4 mt-5 text-sm sm:text-base'>


                {allCategory.map((item, index) => (
                  <div key={index} onClick={() => categoryFilter(item)} className='space-y-4 mt-5 text-sm sm:text-base' >
                    <input type="radio" name="filter" id={item} />
                    <label htmlFor={item} className='ms-2'>{item}</label>
                  </div>))
                }


                <div onClick={() => categoryFilter("No Filter")}>
                  <input type="radio" name="filter" id="nofilter" />
                  <label htmlFor="nofilter" className='ms-2'>No Filter</label>
                </div>
              </div>
            </div>

            <div className='col-span-3'>
              {allBooks?.length > 0 ? <div className='md:grid grid-cols-4 mt-5 md:mt-0'>


                {
                  allBooks?.map((item, index) => (
                    <div key={index} className='shadow rounded p-3 mx-4 my-3'>
                      <img src={item?.imageUrl}
                        width={"100%"} height={"300px"} alt="" />
                      <div className='flex flex-col justify-center items-center mt-4'>
                        <p>{item?.title}</p>
                        <p>Author : {item?.author}</p>
                        <Link to={`/view-book/${item?._id}`} className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border
                            hover:border-blue-800 w-full text-center'>View Book</Link>
                      </div>
                    </div>
                  ))
                }




              </div> :

                <p className='text-red-500 mt-5'>No Book Available...</p>}
            </div>
          </div>

        </>

        :



        <div className='my-10 flex justify-center items-center flex-col'>
          <img src="https://cdn-icons-gif.flaticon.com/11255/11255957.gif" width={"400px"} alt="" />
          <p className='font-semibold text-xl mt-5'>
            Please <Link to={"/login"} className='text-blue-700 font-bold'>Login</Link> To Explore More....
          </p>

        </div>}
      <Footer />

    </>
  )
}

export default AllBooks

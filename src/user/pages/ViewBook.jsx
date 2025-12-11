import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaBackward, FaRegEye } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { getABookAPI, makePaymentAPI } from '../../Services/allAPI'
import SERVERURL from '../../Services/serverURL'
import { loadStripe } from '@stripe/stripe-js'


function ViewBook() {

  const [modalStatus, setModalStatus] = useState(false)  //open modal

  // to store the book details

  const [bookDetails, setBookDetails] = useState({})

  // get id

  const { id } = useParams()

  const getABook = async () => {

    //  get token
    const token = sessionStorage.getItem("token")
    const reqHeader = { "Authorization": `Bearer ${token}` };

    try {

      const result = await getABookAPI(id, reqHeader)
      console.log(result);
      setBookDetails(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(bookDetails);


  //  make payment

  const handlePurchase = async () => {
    const stripe = await loadStripe
      ('pk_test_51ScgVdH0WmUJp5J5eC95XJRm1EhgOQ1hTlPblEzRqe3TkJxmaw9ziqzXfTVOlQ2ZtAHvFUlO2mG16ZVIXJTHM2Z200yUdJwuIA')
    console.log(stripe);
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await makePaymentAPI(bookDetails, reqHeader)
        console.log(result);
        const checkoutSessionUrl = result.data.checkoutSessionUrl
        if (checkoutSessionUrl) {
          window.location.href = checkoutSessionUrl
        }

      } catch (error) {
        console.log(error);
      }
    }

  }


  useEffect(() => {
    getABook()
  }, [])
  return (
    <>
      <Header />

      <div className='m:p-20 p-5 '>
        <div className='shadow w-full md:p-10 p-5'>
          <div className='flex justify-end'>
            <FaRegEye onClick={() => setModalStatus(true)} />
          </div>
          <div className='md:grid grid-cols-[1fr_3fr] w-full'>
            <div>
              <img src={bookDetails?.imageUrl} className='w-full h-100' alt="" />
            </div>

            <div className='px-4'>
              <h1 className='text-center font-semibold text-3xl'>{bookDetails?.title}</h1>
              <p className='text-center text-blue-500 font-medium text-xl'>-{bookDetails?.author}</p>
              <div className='md:flex justify-between mt-10'>
                <p>Publisher :{bookDetails?.publisher} </p>
                <p>Language :{bookDetails?.language} </p>
                <p>No:of Pages :{bookDetails?.noofPages} </p>
              </div>
              <div className='md:flex justify-between mt-10'>
                <p>Seller Mail :{bookDetails?.userMail} </p>
                <p>Real Price : {bookDetails?.price} </p>
                <p>ISBN  : {bookDetails?.isbn} </p>
              </div>
              <p className='text-justify mt-10'>
                {bookDetails?.abstract}
              </p>
              <div className='mt-10 flex justify-end'>
                <Link to={"/all-books"} className='flex px-4 py-3 bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800' ><FaBackward className='mt-1 me-2' /> Back</Link>
                <button onClick={handlePurchase} type='button' className=' px-4 py-3 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800 ms-5'>Buy ₹</button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {modalStatus &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-500/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-250 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h3>Book Images</h3>
                  <button onClick={() => setModalStatus(false)}><IoMdCloseCircle className='text-xl' /></button>
                </div>
                <div className='relative p-5'>
                  <p className='text-blue-600'>Camera click of the book in the hand of seller</p>
                </div>
                <div className='md:flex flex-wrap my-4 overflow-y-hidden'>
                  {bookDetails?.uploadImages.length > 0 ?
                    bookDetails?.uploadImages?.map(img => (
                      <img src={`${SERVERURL}/imguploads/${img}`} alt="" height={"250px"} width={"250px"} className='mx-2 md:mb-0 mb:2' />
                    ))
                    :
                    <p className='font-bold text-red-700 ms-5'>User Upload book images are available...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      }



      <Footer />

    </>
  )
}

export default ViewBook

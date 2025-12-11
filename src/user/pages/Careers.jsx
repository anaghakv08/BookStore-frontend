import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'
import { IoMdCloseCircle } from 'react-icons/io'

function Careers() {
  const [modalStatus, setModalStatus] = useState(false)
  return (
    <>
      <Header />

      <div className='md:px-40 p-5'>
        <div className='text-center '>
          <h1 className=' text-3xl font-bold mb-5'>Careers</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati corporis, assumenda nihil molestias aliquam accusamus quisquam perspiciatis necessitatibus
            quaerat ea odit numquam facere maiores, labore ad consequatur fugiat amet ducimus!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati corporis, assumenda nihil molestias aliquam accusamus
            quisquam perspiciatis necessitatibus quaerat ea odit numquam facere maiores, labore ad consequatur fugiat amet ducimus!</p>
        </div>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'>Current Openings</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type="text" name="" id="" className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' placeholder='Search by Title' />
            <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
          </div>
        </div>

        {/* job listing */}

        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1>Frontend Developer</h1>
              <hr />
            </div>
            <button onClick={() => setModalStatus(true)} className='bg-blue-900 text-white p-3 ms-5 flex items-center'>Apply <FaArrowUpRightFromSquare className='ms-2' /></button>
          </div>
          <p className='flex'><FaLocationDot className='me-2 mt-1' />Kochi</p>
          <p className='text-lg my-2'>Job Type : FULL TIME </p>
          <p className='text-lg my-2'>Salary : 20000-30000/month</p>
          <p className='text-lg my-2'>Qualification : BSC.CS</p>
          <p className='text-lg my-2'>Experience : 1-2 yr</p>
          <p className='text-lg my-2 text-justify'>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius blanditiis pariatur, similique perferendis debitis quasi illum cumque explicabo a, quibusdam, unde illo corporis. Nesciunt dolorum repellendus quae, sed ad nihil.</p>

        </div>

      </div>

      {modalStatus &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-200/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-150 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h3 className='text-xl font-semibold'>Application Form</h3>
                  <button onClick={() => setModalStatus(false)}><IoMdCloseCircle className='text-xl' /></button>
                </div>
                <div className='relative p-5'>
                  <div className='md:grid grid-cols-2 gap-5'>
                    <div className=''>
                      <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" />
                      <input type="text" placeholder="Email Id" className="border p-2 rounded mt-4 w-full" />
                    </div>
                    <div className='gap-3'>
                      <input type="text" placeholder="Qualification" className="border p-2 rounded w-full" />
                      <input type="text" placeholder="Phone" className="border p-2 rounded mt-4 w-full" />
                    </div>
                  </div>
                  <div>
                    <textarea name="" id="" placeholder='Cover Letter' rows={'4'} className='bg-white rounded border  w-full  p-2 mt-3'></textarea>
                  </div>

                  <div>
                    <label htmlFor="" className='font-bold'>Upload Resume:</label>
                    <input type="file" className="w-full border   rounded file:bg-gray-300 file:p-2" />
                  </div>

                  <div className=' flex justify-end gap-3 bg-gray-400 mt-5 p-2 rounded'>
                    <button className='bg-yellow-500 text-black px-5 py-2 rounded font-bold'>Reset</button>
                    <button className='bg-green-500 text-black px-5 py-2 rounded font-bold'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}


      <Footer />


    </>
  )
}

export default Careers

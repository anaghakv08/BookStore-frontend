import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <>
      <div>
        <img className='mx-auto w-[800px]' src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif" alt="" />
      </div>
      <div className='flex justify-center'>
        <Link to={"/"}><button className='bg-blue-500 p-3 font-medium rounded-lg'>Back To Home</button></Link>
      </div>   
    </>
  )
}

export default Pnf

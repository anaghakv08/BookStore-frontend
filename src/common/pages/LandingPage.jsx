import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { getHomeBookAPI } from '../../Services/allAPI'

function LandingPage() {

  const [homeBook, setHomeBook] = useState([])

  // get books

  const getHomeBooks = async () => {

    const result = await getHomeBookAPI()
    console.log(result);
    setHomeBook(result.data)
  }

  useEffect(() => {
    getHomeBooks()
  }, [])








  return (
    <>
      <Header />
      {/* landing */}

      <div style={{ height: "700px" }} className='flex flex-col  justify-center items-center bg-[url(https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=)] bg-no-repeat bg-cover'>
        <div className='w-full flex flex-col justify-center items-center text-white' style={{ height: "700px", backgroundColor: 'rgba(0,0,0,0,5' }}>
          <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
          <p className='font-semibold'>Give Your Family and friends a book</p>
          <div className='mt-9 flex'>
            <input type="text" placeholder='Search Books' className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100 text-black' />
            <HiMiniMagnifyingGlass className='text-gray-500 text-2xl mt-3' style={{ marginLeft: "-40px" }} />
          </div>
        </div>
      </div>
      {/* new arrivals  */}

      <section className='md:px-40 p-5 flex flex-col justify-center items-center'>
        <h1 className='font-bold text-4xl'>NEW ARRIVALS</h1>
        <h1 className='font-medium text-2xl'>Explore Our Latest Collection</h1>
        {homeBook.length > 0 ?
          <div className='md:grid grid-cols-4 w-full mt-5'>
            {homeBook.map((item) => (<div className='p-3'>
              <div className='shadow p-3 rounded'>
                <img height={"300px"} width={"100%"} src={item.imageUrl} alt="" />
                <div className='text-center mt-3'>
                  <p className='font-bold text-2xl'>{item.title}</p>
                  <p className='font-bold text-xl'>{item.author}</p>
                  <p className='font-bold'>₹{item.price}</p>
                </div>
              </div>
            </div>))}
          </div>
          :
          <p>Loading....</p>}
        <div className='text-center my-5'>
          <Link to={"/all-books"}> <button type='button ' className='px-3 py-2 bg-blue-800 text-white hover:border hover:border-blue-800
          hover:text-blue-800 hover:bg-white font-bold'>Explore More</button></Link>
        </div>
      </section>
      {/* featured authors */}
      <section>
        <div className='md:grid grid-cols-2 gap-10 pt-5 m-10'>

          <div className='text-center'>
            <h3 className='text-xl'>FEATURED AUTHORS</h3>
            <h1 className='text-3xl font-medium'>Captivates with every word</h1>

            <p className=' text-justify sm:p-4 pt-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <p className=' text-justify sm:p-4 pt-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div>
            <img className='rounded-lg' width={"650px"} height={"650px"} src="https://img.mathrubhumi.com/view/acePublic/alias/contentid/1lvpbg7eiz6f3729z2v/1/nimna-vijay.webp" alt="" />
          </div>
        </div>
      </section>

      {/* testimonials */}

      <section className='flex flex-col  justify-center items-center mt-20 px-4'>
        <div className='text-center'>
          <h3 className='text-2xl'>TESTIMONIALS</h3>
          <h1 className='text-3xl font-medium'>See What Others Are Saying</h1>
        </div>


        <div className="md:grid grid-cols-3 md:gap-9 max-w-6xl pt-10 mb-5">
          {/* card 1 */}
          <div className="p-3 flex justify-center">
            <div className="shadow-lg p-6 rounded-lg text-center bg-white ">
              <img
                className="rounded-full w-50 h-50 mx-auto object-cover mb-4"
                src="https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2022/09/sales.jpg.optimal.jpg"
                alt="testimonial"
              />
              <p className="font-semibold text-lg mb-2">Treesa Joseph</p>
              <p className="justify-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a book.
              </p>
            </div>
          </div>

          {/* card 2 */}
          <div className="p-3 flex justify-center">
            <div className="shadow-lg p-6 rounded-lg text-center bg-white ">
              <img
                className="rounded-full w-50 h-50 mx-auto object-cover mb-4"
                src="https://www.credif.in/assets/images/blogs/business-manager.jpg"
                alt="testimonial"
              />
              <p className="font-semibold text-lg mb-2">Albin Joseph</p>
              <p className="justify-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a book.
              </p>
            </div>
          </div>
          {/* card 3 */}
          <div className="p-3 flex justify-center">
            <div className="shadow-lg p-6 rounded-lg text-center bg-white ">
              <img
                className="rounded-full w-50 h-50 mx-auto object-cover mb-4"
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1k7AiWR8CoVMLPUoFdwE4u/97c200eb738908804b452607f76634d1/fjKGZWqW.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
                alt="testimonial"
              />
              <p className="font-semibold text-lg mb-2">Aleena Thomas</p>
              <p className="justify-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a book.
              </p>
            </div>
          </div>
        </div>
      </section>




      <Footer />
    </>
  )
}

export default LandingPage

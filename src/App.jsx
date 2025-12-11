import { Route, Routes } from 'react-router-dom';
import LandingPage from './common/pages/LandingPage';
import Contact from './common/pages/Contact';
import Auth from './common/pages/Auth';
import Pnf from './common/pages/Pnf';
import AllBooks from './user/pages/AllBooks';
import Careers from './user/pages/Careers';
import Profile from './user/pages/Profile';
import ViewBook from './user/pages/ViewBook';
import AdminCareers from './admin/pages/AdminCareers';
import { useContext, useEffect, useState } from 'react';
import Loader from './common/pages/Loader';
import AdminHome from './admin/Pages/AdminHome';
import AdminSettings from './admin/Pages/AdminSettings';
import AdminBooks from './admin/Pages/AdminBooks';
import { ToastContainer, toast } from 'react-toastify';
import PaymentSuccess from './user/pages/PaymentSuccess';
import PaymentError from './user/pages/PaymentError';
import { userAuthContext } from './context/AuthContext';


function App() {
  const {role}=useContext(userAuthContext)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 5000)

  }, [])


  return (
    <>
      <Routes>

        {/* common */}
        <Route path='/' element={loader ? <Loader /> : <LandingPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/careers' element={<Careers />} />



        {/* users */}
        {role =="user" &&
        <>
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view-book/:id' element={<ViewBook />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-error' element={<PaymentError />} />
  
        </>
}

        {/* admin */}
        { role =="admin" &&
          <>
          <Route path='/admin-home' element={<AdminHome />} />
          <Route path='/admin-careers' element={<AdminCareers />} />
          <Route path='/admin-books' element={<AdminBooks />} />
          <Route path='/admin-settings' element={<AdminSettings />} />
  
        </>}
        <Route path='*' element={<Pnf />} />

      </Routes>

      <ToastContainer
        position='top-center'
        autoClose={5000} />
    </>
  )
}

export default App
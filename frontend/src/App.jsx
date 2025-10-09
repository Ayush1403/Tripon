import React from 'react'
import { authState } from './store/authStore'
import { useEffect } from 'react';
import {Navigate, Route , Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import BookingPage from './pages/BookingPage';
import OtpVerification from './pages/OtpVerification';
import ItenaryDetail from './pages/ItenaryDetail';
import ItenaryPage from './pages/ItenaryPage';
import SignUpOrganiser from './pages/SignUpOrganiser';
import OrganiserDashboard from './pages/OrganiserDashboard';
import BookingSuccessful from './pages/BookingSuccessful';
import EventCreation from './pages/EventCreation';
import EventPages from './pages/EventPages';
import AllEvents from './pages/AllEvents';
import UserBooking from './pages/UserBooking';
import MyTrip from './pages/MyTrip';
import UserEvents from './pages/UserEvents';

const App = () => {

  const {authUser , isCheckingAuth , checkAuth} = authState();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth){
    return(
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading....</div>
      </div>
    )
  }

  return (
   <main className='w-full '>
   <Routes>
     <Route path='/' element={!authUser ?< Navigate to={'/login'}/>:authUser?.userType === "Organiser" ? <OrganiserDashboard /> : <Home />} />
       <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'}/>} />
       <Route path='/signup' element={<SignUp/>}/>
        <Route path='/itenary' element={<ItenaryDetail />  }/>
          <Route path='/itenaryP' element={<ItenaryPage />  }/>
          <Route path='/signupO' element={<SignUpOrganiser/>}/>
          <Route path='/organiser' element={authUser?.userType==="Organiser"?<OrganiserDashboard />: <Home />} />
          <Route path="/book" element={!authUser ? <Login />:<BookingPage />} />
          <Route path="/booksuccess" element={!authUser ? <Login />:<BookingSuccessful />} />
          <Route path="/eventcreate" element={!authUser ? <Navigate to={"/login"} />:authUser?.userType === "Organiser" ? <EventCreation/> : <Home />}   />
          <Route path="/eventshow/:eventId" element={!authUser ? <Navigate to={"/login"} />:authUser?.userType === "Organiser" ? <EventPages/> : <Home />}   />
          <Route path="/all-events" element={!authUser ? <Navigate to={"/login"} />:authUser?.userType === "Organiser" ? <AllEvents/> : <Home />}   />
          <Route path='user-book' element={!authUser ? <Login /> : <UserBooking /> } />
                    <Route path='my-trips' element={!authUser ? <Login /> : <MyTrip /> } />
<Route path='user-events' element={!authUser ? <Login /> : <UserEvents /> } />

   </Routes>
   </main>
  )
}

export default App
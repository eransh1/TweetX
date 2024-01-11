import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from "./redux/userSlice";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Flip, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Feeds from './pages/Feeds/Feeds';
import Users from './pages/Users/Users';
import Profile from './pages/Profile/Profile';
import MainPage from './pages/Main Page/MainPage';
import PageNotFound from './pages/Error/PageNotFound';

const App = () => {
  const dispatch = useDispatch();
  
 

  useEffect(() => {
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            login({
              email: auth.currentUser.email,
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              photoURL: auth.currentUser.photoURL,
            })
          );
        } else {
          dispatch(logout());
        }
      });
    
    
  //eslint-disable-next-line
  }, []);

 

  return (
   <>
   <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Flip}
            />
       <Routes>
      <Route path="*" element={<PageNotFound showButton={true} />} />
     <Route path="/" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
     <Route path='/dashboard' element={<MainPage/>}>
     <Route path="/dashboard/feed" element={<Feeds />} />
     <Route path="/dashboard/users" element={<Users />} />
     <Route path="/dashboard/profile" element={<Profile />} />
     </Route>
     
     </Routes> 
   </>
  )
}

export default App
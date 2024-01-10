import React from 'react'
import styles from "./DashboardNavbar.module.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { logout, setUserData } from '../../redux/userSlice';
import { remove } from '../../redux/newUserSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const DashboardNavbar = () => {
    const location = useLocation();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutt=()=>{
        signOut(auth)
         .then(() => {dispatch(logout());dispatch(remove());dispatch(setUserData(null))})
          .then(() => {toast.success("Sucessfully logged out");navigate("/");})
    }
  return (
    <>
        <nav>
        <div className={styles.outerCOnt}>
            <h1 className={styles.title}>Tweet X</h1>
            <div className={styles.linkCont}>
                <Link to="/dashboard/feed" className={location.pathname.includes('feed')?styles.activeLink:styles.link}>Feed</Link>
                <Link to="/dashboard/users" className={location.pathname.includes('users')?styles.activeLink:styles.link}>Users</Link>
                <Link to="/dashboard/profile" className={location.pathname.includes('profile')?styles.activeLink:styles.link}>Profile</Link>
            </div>
            <button onClick={logoutt} className={styles.logoutButton}>Logout</button>
        </div>
        </nav>
        
    </>
  )
}

export default DashboardNavbar
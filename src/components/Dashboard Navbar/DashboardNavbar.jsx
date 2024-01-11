import React, { useEffect } from 'react'
import styles from "./DashboardNavbar.module.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { logout, selectUser, selectUserDoc, setUserData } from '../../redux/userSlice';
import { remove } from '../../redux/newUserSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';

const DashboardNavbar = () => {
    const location = useLocation();
    const dispatch=useDispatch()
    const user = useSelector(selectUser);
    const userDoc = useSelector(selectUserDoc);
    const navigate=useNavigate()
    const is_logged_in=localStorage.getItem('is_logged_in')
  // CHECK FOR USER DOC DATA
  useEffect(()=>{
  if(!is_logged_in){navigate("/");return}
  if(user?.email&&!userDoc){fetchUserDocFromFirebase()}
  
  //eslint-disable-next-line
  },[user])
  
  
  async function fetchUserDocFromFirebase(){
    const userDataRef = collection(db, "users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     if(doc.id===user?.email){
      dispatch(setUserData({...doc.data(),id:user.email})); 
     }
    }); 
  }


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
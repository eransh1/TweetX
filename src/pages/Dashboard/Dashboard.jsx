import React, { useEffect } from 'react'
import styles from "./Dashboard.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { logout, selectUser, selectUserDoc, setUserData } from '../../redux/userSlice';
import { signOut } from 'firebase/auth';
import { remove } from '../../redux/newUserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const dispatch=useDispatch()
    const user = useSelector(selectUser);
    const userDoc = useSelector(selectUserDoc);
    const navigate=useNavigate()
console.log("user",user)
console.log("userDoc",userDoc)
// CHECK FOR USER DOC DATA
useEffect(()=>{
if(!user){navigate("/");return}
if(user?.email){fetchUserDocFromFirebase()}

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
    <div>Dashboard</div>
  )
}

export default Dashboard
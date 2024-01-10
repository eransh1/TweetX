import React, { useEffect, useState } from 'react'
import styles from "./Feeds.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserDoc, setUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Feeds = () => {
  const dispatch=useDispatch()
  const user = useSelector(selectUser);
  const userDoc = useSelector(selectUserDoc);
  const navigate=useNavigate()
  const[userPostListIds,setUserPostListIds]=useState([])
const[userFollowingIds,setUserFollowingIds]=useState([])
console.log("user",user)
console.log("userDoc",userDoc)
// CHECK FOR USER DOC DATA
useEffect(()=>{
if(!user){navigate("/");return}
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
  return (
    <div>Feeds</div>
  )
}

export default Feeds
import React, { useEffect, useState } from 'react'
import styles from "./Users.module.css"
import UserCard from '../../components/User Card/UserCard'
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Users = () => {
  const userDoc = useSelector(selectUserDoc);
  const[loading,setLoading]=useState(true)
  const[usersList,setUsersList]=useState([])

useEffect(()=>{
  if(userDoc){
    fetchUserListFromFirebase()
  }
  return () => {
    setUsersList([])
  }
  //eslint-disable-next-line
},[userDoc])

  async function fetchUserListFromFirebase(){
    const tempUsersList=[]
    const userDataRef = collection(db, "users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     if(doc.id!==userDoc?.email){
      tempUsersList.push(doc.data())
     }
    }); 
    setUsersList(tempUsersList)
    setLoading(false)
  }

  return (
   <>
     <section className={styles.outerCont}>
      <section className={styles.innerCont}>
        <div className={styles.postOuterCont}>
        {loading&&<div className={styles.noFeedsToShowCont}><h1>Loading...</h1></div>}

        {!!!usersList.length&&!loading&&<div className={styles.noFeedsToShowCont}><h1>No users to show</h1></div>}
        {!!usersList.length&&!loading&&usersList.map((user)=>{return (
          <UserCard key={user.email} user={user}/>
        )
        })}
          
        </div>
      </section>
    </section>
   </>
  )
}

export default Users
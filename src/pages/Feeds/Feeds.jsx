import React, { useEffect, useState } from 'react'
import styles from "./Feeds.module.css"
import { selectUserDoc } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import PostCard from '../../components/Post Card/PostCard';
import CreatePostModal from '../../components/Create Post Modal/CreatePostModal';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';


const Feeds = () => {
  const userDoc = useSelector(selectUserDoc);
  const[showModal,setShowModal]=useState(false)
  const[feedsList,setFeedsList]=useState([])
  const[loading,setLoading]=useState(true)


useEffect(()=>{
if(userDoc){

  let tempPostIdsArray=[]

  if(userDoc.post_list.length){
    tempPostIdsArray=[...userDoc.post_list]
  }

  const userEmails=[]
  if(userDoc.following_list.length){
    userDoc.following_list.forEach((user)=>{
      userEmails.push(user)
    })
  }
  
if(userEmails.length){
  collectPostIds([...new Set(userEmails)],tempPostIdsArray)
}
else{
  if(tempPostIdsArray.length){
    getFeedsForDataBase(tempPostIdsArray)
  }
  else{
    setLoading(false)
  }
}
  
}

//eslint-disable-next-line
},[userDoc])

async function collectPostIds(uniqueUserEmails,tempPostIdsArray){
const tempPostIdsArrayCopy=[...tempPostIdsArray]
const userDataRef = collection(db, "users");
const q = query(userDataRef);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  if(uniqueUserEmails.includes(doc.id)){
    tempPostIdsArrayCopy.push(...doc.data().post_list)
  }
 }); 

 getFeedsForDataBase(tempPostIdsArrayCopy) 
}


function getProperTimer(time){

const {nanoseconds,seconds}=time
const timestampSeconds = seconds;
const timestampNanoseconds = nanoseconds;
// Combine seconds and nanoseconds
const timestampCombined = timestampSeconds + timestampNanoseconds / 1e9;

// Create a new Date object with the timestamp in milliseconds
const date = new Date(timestampCombined * 1000);

return date
}

async function getFeedsForDataBase(tempPostIdsArray){

  let tempFinalFeedsList=[]

  const userDataRef = collection(db, "posts");
  const q = query(userDataRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if(tempPostIdsArray.includes(doc.id)){
      tempFinalFeedsList.push({...doc.data(),createdAt:getProperTimer(doc.data().createdAt)})
    }
   });
   tempFinalFeedsList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // Compare the dates
    return dateB - dateA;
});
setFeedsList(tempFinalFeedsList)
setLoading(false)
}


  return (
  <>
  {showModal&&<CreatePostModal setShowModal={setShowModal} setFeedsList={setFeedsList} />}
    <section className={styles.outerCont}>
      <section className={styles.innerCont}>
        <button onClick={()=>setShowModal(true)} className={styles.writeButton}>Write</button>
        <div className={styles.postOuterCont}>
        {loading&&<div className={styles.noFeedsToShowCont}><h1>Loading...</h1></div>}

        {!!!feedsList.length&&!loading&&<div className={styles.noFeedsToShowCont}><h1>No feeds to show</h1></div>}
        {!!feedsList.length&&!loading&&feedsList.map((post)=>{return (
          <PostCard key={post.id} post={post}/>
        )
        })}
          
        </div>
      </section>
    </section>
  </>
  )
}

export default Feeds
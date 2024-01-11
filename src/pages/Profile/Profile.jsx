import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css"
import UserInfoPannel from '../../components/User Info Pannel/UserInfoPannel'
import { TbMessage2Minus } from "react-icons/tb";
import PostCard from '../../components/Post Card/PostCard';
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
const Profile = () => {
  const userDoc = useSelector(selectUserDoc);
  const[optionChoosen,setOptionChoosen]=useState("post")
  const[feedsList,setFeedsList]=useState([])
  const[loading,setLoading]=useState(false)

  useEffect(()=>{
    if(userDoc){
      setFeedsList([])
      setLoading(true)
      if(optionChoosen==="post"){
        getUserPosts()
      }
      if(optionChoosen==="following"){
        getUserFollwingPosts()
      }
      if(optionChoosen==="followers"){
        getUserFollwersPosts()
      }    
      
    }
    
    //eslint-disable-next-line
    },[userDoc,optionChoosen])

    

    async function getUserPosts(){
      let tempPostIdsArray=[]
    
      if(userDoc.post_list.length){
        tempPostIdsArray=[...userDoc.post_list]
      }
      if(tempPostIdsArray.length){
        getFeedsForDataBase(tempPostIdsArray)
      }
      else{
        setLoading(false)
      }
     
    }

    async function getUserFollwingPosts(){
      const userEmails=[]
      if(userDoc.following_list.length){
        userDoc.following_list.forEach((user)=>{
          userEmails.push(user)
        })
      }
      if(userEmails.length){
        collectPostIds([...new Set(userEmails)],[])
      }
      else{
        setLoading(false)
      }
    }

    async function getUserFollwersPosts(){
      const userEmails=[]
      if(userDoc.follower_list.length){
        userDoc.follower_list.forEach((user)=>{
          userEmails.push(user)
        })
      }
      if(userEmails.length){
        collectPostIds([...new Set(userEmails)],[])
      }
      else{
        setLoading(false)
      }
    }

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

  return (
    <section className={styles.outerCont}>
      <section className={styles.innerCont}>
      <UserInfoPannel/>

<div className={styles.optionOuterCont}>
  <div className={styles.optionInnerCont}>
    <p onClick={()=>setOptionChoosen('post')} className={optionChoosen==="post"?styles.activeOption:styles.option}><TbMessage2Minus/> Post</p>
    <p onClick={()=>setOptionChoosen('followers')} className={optionChoosen==="followers"?styles.activeOption:styles.option}><TbMessage2Minus/> Followers</p>
    <p onClick={()=>setOptionChoosen('following')} className={optionChoosen==="following"?styles.activeOption:styles.option}><TbMessage2Minus/> Following</p>
  </div>
</div>

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
  )
}

export default Profile
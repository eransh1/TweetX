import React, { useEffect, useState } from 'react'
import styles from "./PostCard.module.css"
import { getUserDocByRef } from '../../firebase'

const PostCard = ({post}) => {
const[postedByUserDoc,setPostedByUserDoc]=useState(null)

//GET USER DATA FROM REFERENCE LINK WHO HAS POSTED
useEffect(()=>{
 
  getUserDocByRef(post?.postedby).then((res)=>{
      
      setPostedByUserDoc(res)
  })  

},[post])

function calculateTimeAgo(postedDate) {
  let currentDate = new Date();
  let timeDifference = currentDate - postedDate;

  let millisecondsPerDay = 24 * 60 * 60 * 1000;
  let daysAgo = Math.floor(timeDifference / millisecondsPerDay);

  let monthsAgo =
    currentDate.getMonth() -
    postedDate.getMonth() +
    12 * (currentDate.getFullYear() - postedDate.getFullYear());

  let yearsAgo = Math.floor(monthsAgo / 12);

  return {
    daysAgo: daysAgo,
    monthsAgo: monthsAgo,
    yearsAgo: yearsAgo,
  };
}

const handleDateOfConversation=(d)=>{
let result
let datConvObj=calculateTimeAgo(new Date(d))
if(datConvObj.daysAgo===0){result=new Date(d).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
else if(datConvObj.monthsAgo===0&&datConvObj.daysAgo<=30){result=datConvObj.daysAgo+" Day Ago"}
else if(datConvObj.monthsAgo>0&&datConvObj.daysAgo<=30){result=datConvObj.daysAgo+" Day Ago"}
else if(datConvObj.monthsAgo<=12&&datConvObj.daysAgo>30){result=datConvObj.monthsAgo+" Month Ago"}
else if(datConvObj.yearsAgo>0&&datConvObj.monthsAgo>=12){result=datConvObj.yearsAgo+" Year Ago"}
return(result)
}

  return (
   <section className={styles.outerCont}>
   <p className={styles.circleImage}></p>
<p className={styles.imageCont}>
    <img className={styles.profileImage} src={postedByUserDoc?.image} alt="profileImg" />
</p>
<div className={styles.InfoCont}>
    <p className={styles.userName}>{postedByUserDoc?.name}</p>
    <p className={styles.timePosted}> {handleDateOfConversation(post?.createdAt)}</p>
    <p className={styles.userPost}>{post?.text}</p>
</div>
   </section>
  )
}

export default PostCard
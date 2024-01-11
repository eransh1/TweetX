import React, { useState } from 'react'
import styles from "./UserCard.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDoc, setUserData } from '../../redux/userSlice';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UserCard = ({user}) => {
    const userDoc = useSelector(selectUserDoc);
    const[showingUserData,setShowingUserData]=useState(user)
    const dispatch=useDispatch()
    const[requesting,setRequesting]=useState(false)

async function handleFollowUser(){
  setRequesting(true)
  handleFollowRequest(user?.email)
  const userFollowerList=[...user?.follower_list]
  userFollowerList.push(userDoc.email)

  const userDocumentRef=doc(db,"users",user?.email)
  await updateDoc(userDocumentRef,{
    follower_list:userFollowerList
  })

  const mineFollowingList=[...userDoc?.following_list]
  mineFollowingList.push(user.email)
  const mineDocumentRef=doc(db,"users",userDoc?.email)
  await updateDoc(mineDocumentRef,{
    following_list:mineFollowingList
  })

  setRequesting(false)
}
async function handleUnfollowUser(){
  setRequesting(true)
  handleUnFollowRequest(user?.email)

  const userFollowerList=[...user?.follower_list].filter((email)=>email!==userDoc.email)
  const userDocumentRef=doc(db,"users",user?.email)
  await updateDoc(userDocumentRef,{
    follower_list:userFollowerList
  })

  const mineFollowingList=[...userDoc?.following_list].filter((email)=>email!==user.email)
  const mineDocumentRef=doc(db,"users",userDoc?.email)
  await updateDoc(mineDocumentRef,{
    following_list:mineFollowingList
  })
  setRequesting(false)
}



function handleFollowRequest(followedUserEmail){
  setShowingUserData({...showingUserData,follower_list:[...showingUserData.follower_list,userDoc.email]})
   
  const mineFollowingList=[...userDoc?.following_list]
  mineFollowingList.push(followedUserEmail)
  dispatch(setUserData({...userDoc,following_list:mineFollowingList}))
  }

  function handleUnFollowRequest(followedUserEmail){
    const newFollowerList=showingUserData.follower_list.filter((email)=>email!==userDoc.email)

    setShowingUserData({...showingUserData,follower_list:newFollowerList})
     
    const mineFollowingList=[...userDoc?.following_list].filter((email)=>email!==followedUserEmail)
    dispatch(setUserData({...userDoc,following_list:mineFollowingList}))
    }

  return (
   <>
    <section className={styles.outerCont}>
    <p className={styles.imageCont}>
    <img className={styles.profileImage} src={showingUserData?.image} alt="profileImg" />
</p>

<div className={styles.infoCont}>
<p className={styles.userName}>{showingUserData?.name}</p>
<p className={styles.timePosted}>{`Following : ${showingUserData?.following_list?.length}`}</p>
</div>
{userDoc.following_list.includes(showingUserData?.email)?
<button disabled={requesting} onClick={handleUnfollowUser} className={styles.unfollowButton}>Following</button>:
<button disabled={requesting} onClick={handleFollowUser} className={styles.followButton}>Follow</button>
}
    </section>
   </>
  )
}

export default UserCard
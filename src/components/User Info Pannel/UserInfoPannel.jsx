import React from 'react'
import styles from "./UserInfoPannel.module.css"
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';

const UserInfoPannel = () => {
    const userDoc = useSelector(selectUserDoc);
  return (
   <section className={styles.outerCont}>
    <img className={styles.userImage} src={userDoc?.image} alt="userImage" />
   <div className={styles.outterInnerCont}>
   <div className={styles.infoCont}>
    <h1 className={styles.userName}>{userDoc?.name}</h1>
    <div className={styles.countsCont}>
      <p>{`Posts : ${userDoc?.post_list?.length}`}</p>
      <p>{`Followers : ${userDoc?.follower_list?.length}`}</p>
      <p>{`Following : ${userDoc?.following_list?.length}`}</p>
    </div>
    </div>
   </div>
   </section>
  )
}

export default UserInfoPannel
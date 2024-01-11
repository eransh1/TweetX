import React from 'react'
import styles from "./UserInfoPannel.module.css"
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';

const UserInfoPannel = () => {
    const userDoc = useSelector(selectUserDoc);
  return (
   <section className={styles.outerCont}>
    <img className={styles.userImage} src={userDoc.image} alt="userImage" />
   </section>
  )
}

export default UserInfoPannel
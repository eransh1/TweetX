import React from 'react'
import styles from "./Profile.module.css"
import UserInfoPannel from '../../components/User Info Pannel/UserInfoPannel'
const Profile = () => {
  return (
    <section className={styles.outerCont}>
      <section className={styles.innerCont}>
      <UserInfoPannel/>
      </section>
      </section>
  )
}

export default Profile
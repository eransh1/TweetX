import React from 'react'
import styles from "./UserCard.module.css"
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';

const UserCard = ({user}) => {
    const userDoc = useSelector(selectUserDoc);
  return (
   <>
    <section className={styles.outerCont}>
    <p className={styles.imageCont}>
    <img className={styles.profileImage} src={user?.image} alt="profileImg" />
</p>

<div className={styles.infoCont}>
<p className={styles.userName}>{user?.name}</p>
<p className={styles.timePosted}>{`Following : ${user?.following_list?.length}`}</p>
</div>
{userDoc.following_list.includes(user?.email)?
<button className={styles.unfollowButton}>Following</button>:
<button className={styles.followButton}>Follow</button>
}
    </section>
   </>
  )
}

export default UserCard
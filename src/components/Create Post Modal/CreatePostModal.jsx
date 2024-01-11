import React, { useState } from 'react'
import styles from "./CreatePostModal.module.css"
import { useSelector } from 'react-redux';
import { selectUserDoc } from '../../redux/userSlice';
import {doc, setDoc, updateDoc} from "firebase/firestore";
import { db } from '../../firebase';
import { toast } from 'react-toastify';
const CreatePostModal = ({setShowModal,setFeedsList}) => {
    const userDoc = useSelector(selectUserDoc);
    const[text,setText]=useState("")
    const[uploading,setUplaoding]=useState(false)

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            setShowModal(false)
        }
    };

async function createFeed(e){
    e.preventDefault()
    setUplaoding(true)
    toast.loading("Creating feed");
    const userRef = doc(db, "users", userDoc?.email);
    try {
        const timeId = new Date().getTime().toString();
      let newPostIdArray=[...userDoc.post_list]
      const newPostData={
        comments: [],
        createdAt: new Date(),
        image: "",
        likes: [],
        postedby: userRef,
        text,
        id:timeId
      }
        await setDoc(doc(db, "posts", timeId), newPostData);
       
        newPostIdArray.push(timeId);
        await updateUserDatabase(newPostIdArray,newPostData);
      } catch (error) {
        toast.dismiss()
        setUplaoding(false)
        toast.error(error.message)
      }
}

async function updateUserDatabase(ids,newPostData){
    const userRef = doc(db, "users", userDoc?.email);
    try {
        await updateDoc(userRef, { post_list: ids });
        toast.dismiss()
        setUplaoding(false)
        toast.success("Sucessfully Created");
        setShowModal(false)
        setFeedsList((prev)=>{return[newPostData,...prev]})
      } catch (error) {
        toast.dismiss()
        setUplaoding(false)
        toast.error(error.message)
      }
}

  return (
    <section className={styles.outerCont}>
      <div onClick={()=>setShowModal(false)} className={styles.closeIcon}>X</div>
     <p className={styles.closeIconEscText}>ESC</p>
        <form onSubmit={createFeed} className={styles.innerCont}>
            <h1>Create Feed</h1>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder='What is on your mind' className={styles.textArea} rows="7"  required></textarea>
            <button disabled={uploading} className={styles.createBtn}>Create</button>
        </form>
    </section>
  )
}

export default CreatePostModal
import React, { useEffect, useState } from 'react'
import styles from "./Signup.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { create } from '../../redux/newUserSlice';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar.jsx/Navbar';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const navigate = useNavigate();
  const userType='Individual'
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const is_logged_in=localStorage.getItem('is_logged_in')

  useEffect(()=>{
    if(is_logged_in){
      navigate("/dashboard/feed")
    }
   
     //eslint-disable-next-line
    },[])
    
  //eslint-disable-next-line
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch(
          create({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
            userType: userType,
            loginType: "google",
          })
        );
      })
      .then(() => {
        navigate("/dashboard")
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createUserDoc=async()=>{
    try {
        await setDoc(
         doc(db, "users", email),{
                name:userName,
                image:"https://firebasestorage.googleapis.com/v0/b/tweetx-project.appspot.com/o/images%2Fuser_default_image.jpg?alt=media&token=9f917390-2a6d-4504-b1ee-09f420e96b0f",
                email:email,
                following_list:[],
                follower_list:[],
                post_list:[]
            })      
    } catch (error) {
      console.log(error.message)
    }
    }

  const signUpEmail = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(password.length<6){toast.error("Password should be min 6 letters");return}
    if (password === confirmPassword) {
      const newUser={
        name:userName,
        email: email,
        userType,
        password,
      }

try {
  toast.loading("Creating Account...")
  await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
  toast.dismiss()
  toast.loading("Creating Database for your account...")
  await  createUserDoc()
  toast.dismiss()
  dispatch(create({ newUser }));
  toast.success("Successfully Registered")
  navigate("/");
} 
catch (error) {
  toast.dismiss()
  console.log(error);
  toast.error(error.message);
}
setLoading(false)
} else {
      toast.error("Passwords do not match");
      setLoading(false)
    }
  };

  return (
    <>
      <Navbar/>
     <section className={styles.outerCont}>
    <div className={styles.leftCont}>
    <button onClick={()=>navigate("/")} className={styles.loginButton}>Login</button>
    <h1 className={styles.title}>Create Account</h1>

    <form onSubmit={signUpEmail} className={styles.form}>
      <input className={styles.input} type="text" placeholder='Name' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
      <input className={styles.input} type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input className={styles.input} type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <input className={styles.input} type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
   { !loading&&<button disabled={loading} className={styles.signUpButton} type='Submit'>Sign Up</button>}
    </form>
    </div>
    <div className={styles.rightCont}>
    <img className={styles.image} src="https://firebasestorage.googleapis.com/v0/b/tweetx-project.appspot.com/o/images%2FSign%20up%20Image.png?alt=media&token=f06e5625-8bad-400a-afbc-5562d54d04ac" alt="signupImage" />
    </div>
     </section>
    </>
  )
}

export default Signup
import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { login } from '../../redux/userSlice';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar.jsx/Navbar';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const provider = new GoogleAuthProvider();
  const[showPass,setShowPass]=useState(false)
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
      .then(async () => {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loginEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)

      .then(() => {
        toast.success("Sucessfully logged in");
        setLoading(false)
        navigate("/dashboard/feed");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false)
      });
  };

  return (
<>
<Navbar/>
     <section className={styles.outerCont}>
    <div className={styles.leftCont}>
    <button onClick={()=>navigate("/signup")} className={styles.loginButton}>Create Account</button>
    <h1 className={styles.title}>Login</h1>

    <form onSubmit={loginEmail} className={styles.form}>
      <input className={styles.input} type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
    <div className={styles.passwordCont}>
    <input className={styles.input} type={showPass?"text":"password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    {showPass?<FaEye onClick={()=>setShowPass(false)} className={styles.icon}/>:<FaEyeSlash onClick={()=>setShowPass(true)} className={styles.icon}/>}
    </div>
     {!loading&& <button disabled={loading} className={styles.signUpButton} type='Submit'>Log In</button>}
    </form>
    </div>
    <div className={styles.rightCont}>
    <img className={styles.image} src="https://firebasestorage.googleapis.com/v0/b/tweetx-project.appspot.com/o/images%2FSign%20up%20Image.png?alt=media&token=f06e5625-8bad-400a-afbc-5562d54d04ac" alt="signupImage" />
    </div>
     </section>
</>
  )
}

export default Login
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./PageNotFound.module.css"


const PageNotFound = () => {
    return (

        <>
        <section className={styles.outerCont}>
            <div className={styles.innerCont}>
            <h1 className={styles.four_zero_four_text}>404</h1>
            <h2 className={styles.infoCont}>Look like you're lost</h2>
            <p className={styles.warningText}>The page you are looking for not available!</p>
            <Link to="/" className={styles.gobackButton}>Go to home</Link>
            </div>
        </section>
      
        </>
    )
}
export default PageNotFound
import React from 'react'
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <>
        <nav>
        <div className={styles.outerCOnt}>
            <h1 className={styles.title}>Tweet X</h1>
        </div>
        </nav>
    </>
  )
}

export default Navbar
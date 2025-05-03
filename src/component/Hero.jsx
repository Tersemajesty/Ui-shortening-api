import React from 'react'
import styles from '../styles/Hero.module.css'
import { Link } from 'react-router-dom'
 const Hero = () => {
    return (
        <div className={styles.hero}>
        <div className={styles.container}>
          <h1>More than just shorter links</h1>
          <p>Build your brand's recognition and get detailed insights on how your links are performing.</p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </div>
    )
}
export default Hero
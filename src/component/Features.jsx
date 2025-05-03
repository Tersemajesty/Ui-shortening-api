import React from 'react'
import styles from '../styles/features.module.css'


 const Features = () => {
    return (
        <section id="features" className={styles.features}>
          <div className={styles.container}>
            <div className={styles.heading}>
              <h2>Advanced Statistics</h2>
              <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
            </div>
    
            <div className={styles.featureCards}>
              <div className={styles.connectingLine}></div>
    
              <div className={`${styles.featureCard} ${styles.card1}`}>
                <div className={styles.iconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3>Brand Recognition</h3>
                <p>
                  Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill
                  confidence in your content.
                </p>
              </div>
    
              <div className={`${styles.featureCard} ${styles.card2}`}>
                <div className={styles.iconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3>Detailed Records</h3>
                <p>
                  Gain insights into who is clicking your links. Knowing when and where people engage with your content
                  helps inform better decisions.
                </p>
              </div>
    
              <div className={`${styles.featureCard} ${styles.card3}`}>
                <div className={styles.iconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3>Fully Customizable</h3>
                <p>
                  Improve brand awareness and content discoverability through customizable links, supercharging audience
                  engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
      )
}
export default Features
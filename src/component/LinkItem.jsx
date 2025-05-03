
import { useState } from "react"
import styles from "../styles/linkItem.module.css"

export default function LinkItem({ original, shortened, onDelete, showDelete = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.linkItem}>
      <p className={styles.originalLink}>{original}</p>
      <div className={styles.shortLinkContainer}>
        <a href={shortened} target="_blank" rel="noopener noreferrer" className={styles.shortLink}>
          {shortened}
        </a>
        <div className={styles.buttonGroup}>
          <button onClick={handleCopy} className={`${styles.copyButton} ${copied ? styles.copied : ""}`}>
            {copied ? "Copied!" : "Copy"}
          </button>
          {showDelete && (
            <button onClick={onDelete} className={styles.deleteButton}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

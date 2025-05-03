import React, { useState } from 'react'
import styles from '../styles/shortener.module.css'
import { useAuth } from "../context/AuthContext"
import LinkItem from './LinkItem' // Ensure this component exists
// import necessary modules/components

const Shortener = () => {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!url.trim()) {
      setError('Please enter a URL')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`)
      const data = await response.json()

      if (data.ok) {
        const newLink = {
          original: url,
          short: data.result.full_short_link,
        }
        setLinks((prevLinks) => [...prevLinks, newLink])
        setUrl('')
      } else {
        setError('Failed to shorten the link')
        throw new Error(data.error)
      }
    } catch (error) {
      setError('An error occurred while shortening the link')
      console.error("Shortening failed:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLink = (indexToRemove) => {
    setLinks(links.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className={styles.Shortener}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Shorten a link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={error ? styles.inputError : ""}
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <button type="submit" className={styles.shortenButton} disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten It!"}
            </button>
          </form>
        </div>

        {links.length > 0 && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>{user ? `Your Links, ${user.name}` : "Your Links"}</h2>
            {links.map((link, index) => (
              <LinkItem
                key={index}
                original={link.original}
                shortened={link.short}
                onDelete={() => deleteLink(index)}
                showDelete={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shortener

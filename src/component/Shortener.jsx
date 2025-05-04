import React, { useEffect, useState } from 'react'
import styles from '../styles/shortener.module.css'
import { useAuth } from "../context/AuthContext"
import LinkItem from './LinkItem' 

export default function Shortener() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [links, setLinks] = useState([])
  const { user } = useAuth()

  // Load saved links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem("shortened_links")
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks)
        setLinks(parsedLinks)
      } catch (e) {
        console.error("Failed to parse saved links", e)
      }
    }
  }, [])

  // Save links to localStorage whenever they change
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem("shortened_links", JSON.stringify(links))
    }
  }, [links])

  const isValidUrl = (string) => {
    try {
      // Make sure URL has a protocol
      if (!string.match(/^https?:\/\//i)) {
        string = "https://" + string
      }
      new URL(string)
      return { valid: true, url: string }
    } catch (_) {
      return { valid: false, url: string }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset error state
    setError("")

    // Validate URL
    if (!url) {
      setError("Please add a link")
      return
    }

    const urlValidation = isValidUrl(url)
    if (!urlValidation.valid) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    try {
      // Using shrtco.de API for URL shortening
      const apiUrl = `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(urlValidation.url)}`
      console.log("Calling API:", apiUrl) // Debug log

      const response = await fetch(apiUrl)
      const data = await response.json()

      console.log("API Response:", data) // Debug log

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      if (!data.ok) {
        throw new Error(data.error || "API returned an error")
      }

      const newLink = {
        original: urlValidation.url,
        short: data.result.full_short_link,
        userId: user?.id || "anonymous",
        createdAt: new Date().toISOString(),
      }

      setLinks([newLink, ...links])
      setUrl("")
    } catch (err) {
      console.error("Error shortening URL:", err)
      setError(err.message || "Failed to shorten URL. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLink = (index) => {
    const newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks(newLinks)
    localStorage.setItem("shortened_links", JSON.stringify(newLinks))
  }

  return (
    <section className={styles.shortener}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Shorten a link here... (e.g., https://example.com)"
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
    </section>
  )
}

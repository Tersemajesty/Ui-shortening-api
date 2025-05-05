import React, { useEffect, useState } from 'react'
import styles from '../styles/shortener.module.css'
import { useAuth } from "../context/AuthContext"
import LinkItem from './LinkItem'
import { toast } from 'react-toastify'

export default function Shortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [links, setLinks] = useState([])
  const { user } = useAuth()

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

  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem("shortened_links", JSON.stringify(links))
    }
  }, [links])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    // Validate URL
    try {
      new URL(url)
    } catch (_) {
      toast.error("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 7)
      const short = `https://snpy.io/${randomCode}`

      const newLink = {
        original: url,
        short,
        userId: user?.id || "anonymous",
        createdAt: new Date().toISOString(),
      }

      setLinks([newLink, ...links])
      setShortUrl(short)
      setUrl('')
      setIsLoading(false)
      toast.success("URL shortened successfully!")
    }, 1000)
  }

  const deleteLink = (index) => {
    const newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks(newLinks)
    localStorage.setItem("shortened_links", JSON.stringify(newLinks))
  }

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      toast.success('Copied to clipboard!')
    }
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

        {shortUrl && (
          <div className={styles.copyContainer}>
            <p><strong>Shortened URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            <button onClick={copyToClipboard} className={styles.copyButton}>Copy</button>
          </div>
        )}

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

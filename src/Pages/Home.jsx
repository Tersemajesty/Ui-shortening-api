import React from 'react'
import Features from '../component/Features'
import Hero from '../component/Hero'
import Header from '../component/Header'
import Footer from '../component/Footer'
import LinkItem from '../component/LinkItem'
import Shortener from '../component/Shortener'

 const Home = () => {
    return (
        <div>
          <Header />
            <Hero />
            <Shortener />
            <Features />
            <LinkItem />
            <Footer />
        </div>
    )
}
export default Home
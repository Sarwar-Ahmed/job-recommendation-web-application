import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Recommendations from '../Recommendations/Recommendations'

function Home() {
  return (
    <div style={{ textAlign: "center", justifyContent: "center", color: "white" }}>
        <Header />
        <Recommendations />
        <Footer />
    </div>
  )
}

export default Home;
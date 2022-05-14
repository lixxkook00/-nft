import React from 'react'
import './LandingPage.scss'

import Header from '../../components/Header'
import Footer  from '../../components/Footer'
import ContentLandingPage from '../../components/ContentLandingPage'

export default function LandingPage() {
  return (
    <div className="landing-page">

        <Header />

        <ContentLandingPage />

        <Footer />
    </div>
  )
}

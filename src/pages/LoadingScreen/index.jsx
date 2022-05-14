import React from 'react'
import './LoadingScreen.scss'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
        <img className="loading-screen-logo" src="/images/Artboard 402.png" alt="" />
        <img className="loading-screen-loading" src="/images/Spinner-1s-334px.gif" alt="" />
    </div>
  )
}

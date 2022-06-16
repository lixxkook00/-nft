import React from 'react'
import { Route,Routes} from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Marketplace from '../pages/Marketplace'
import MarketplaceDetail from '../pages/MarketplaceDetail'
import SignUp from "../pages/SignUp"

export default function Routers() {
  return (
    <Routes>
        {/* Landing Page */}
        <Route exact path="/" element={< LandingPage/>} />

        <Route exact path="/market-place" element={< Marketplace/>} />

        {/* Sign Up page */}
        <Route exact path="/sign-up" element={< SignUp/>} />


        {/* Detail Shop */}
        <Route path="/market-place/:_id" element={<MarketplaceDetail/>} />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound404/>} /> */}
    </Routes>
  )
}

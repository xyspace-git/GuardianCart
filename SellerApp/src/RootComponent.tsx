import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LaunchScreen  from './pages/LaunchScreen';
import MainSplash from './pages/SecondSplashScreen';
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LAUNCH_SCREEN} element={<LaunchScreen/>} />
               {/* <Route path={ROUTES.MAINSPLASH_ROUTE} element={<MainSplash/>} /> */}
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent

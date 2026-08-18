import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { MainLayout } from './components/Layout/MainLayout'
import { NavBar } from './components/NavBar/NavBar'
import { ErrorBoundary } from './components/Common/ErrorBoundary'
import HomePage from './pages/Home'
import PortfolioPage from './pages/Portfolio'
import ServicesPage from './pages/Services'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <NavBar />
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
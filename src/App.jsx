import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

const Services = lazy(() => import('./components/Services'))
const Gallery  = lazy(() => import('./components/Gallery'))
const About    = lazy(() => import('./components/About'))
const Booking  = lazy(() => import('./components/Booking'))
const Footer   = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <Gallery />
        <About />
        <Booking />
        <Footer />
      </Suspense>
    </div>
  )
}

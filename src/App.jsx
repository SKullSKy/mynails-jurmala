import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

const Services = lazy(() => import('./components/Services'))
const Gallery  = lazy(() => import('./components/Gallery'))
const About    = lazy(() => import('./components/About'))
const Contact  = lazy(() => import('./components/Contact'))
const Footer   = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <div style={{ background: '#F2F0EB', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <Gallery />
        <About />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

import Nav from './components/Nav'
import Hero from './components/Hero'
import Keyboard from './components/Keyboard'
import Install from './components/Install'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Keyboard />
        <Install />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

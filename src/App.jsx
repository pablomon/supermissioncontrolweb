import Nav from './components/Nav'
import Hero from './components/Hero'
import Keyboard from './components/Keyboard'
import ForceQuit from './components/ForceQuit'
import Install from './components/Install'
import Pricing from './components/Pricing'
import Privacy from './components/Privacy'
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
        <ForceQuit />
        <Install />
        <Pricing />
        <Privacy />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

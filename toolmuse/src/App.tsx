import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Tools } from './components/Tools'
import { Team } from './components/Team'
import { Workspace } from './components/Workspace'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tools />
      <Team />
      <Workspace/>
      <Footer/>
    </>
  )
}

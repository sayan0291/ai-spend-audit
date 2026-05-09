import './index.css'
import { Routes,Route } from 'react-router-dom'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './pages/Hero.jsx'
import { Audit } from './pages/Audit.jsx'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Hero /> }/>
        <Route path='/hero' element={ <Hero /> }/>
        <Route path='/audit' element={ <Audit /> }/>
      </Routes>
    </>
  )
}

export default App

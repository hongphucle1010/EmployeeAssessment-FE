import './App.css'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import { Button } from 'flowbite-react'

function Temp() {
  return (
    <>
      <Button></Button>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/HomePage' />} />
          <Route element={<Navigation />}>
            <Route path='/HomePage' element={<Temp />} />
            <Route path='/Temp1' element={<Temp />} />
            <Route path='/Temp2' element={<Temp />} />
            <Route path='/Temp3' element={<Temp />} />
            <Route path='/Login' element={<Temp />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

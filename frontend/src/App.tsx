import { useState } from 'react'
import Landing from './Pages/Landing'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Landing />
    </>
  )
}

export default App

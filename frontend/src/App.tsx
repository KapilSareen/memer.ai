import { useState } from 'react'
import Landing from './Pages/Landing'
import AnotherPage from './Pages/PageSecond'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Landing />} />
        <Route path="/another-page" element={<AnotherPage />} />
        
      </Routes>
    </Router>
  )
}

export default App

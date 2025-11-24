import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div className="App">
      <h1>LP Winners</h1>
      {message && <p>Backend response: {message}</p>}
    </div>
  )
}

export default App
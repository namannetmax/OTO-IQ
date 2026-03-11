import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('Loading Supabase connection...')

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY

        if (supabaseUrl && supabaseKey) {
          setStatus('✓ Supabase connected')
        } else {
          setStatus('⚠ Supabase credentials not configured')
        }
      } catch (error) {
        setStatus('✗ Failed to connect to Supabase')
      }
    }

    checkSupabase()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Your App</h1>
        <p className="status">{status}</p>

        <div className="counter">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </div>

        <p className="description">
          Your application is running successfully with Vite + React + Supabase
        </p>
      </div>
    </div>
  )
}

export default App

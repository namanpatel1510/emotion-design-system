import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar     from './components/atoms/navbar/Navbar'
import Docs       from './pages/Docs'
import Releases   from './pages/Releases'
import Components from './pages/Components'
import Settings   from './pages/Settings'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Docs />}        />
          <Route path="/releases"   element={<Releases />}    />
          <Route path="/components" element={<Components />}  />
          <Route path="/settings"   element={<Settings />}    />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App

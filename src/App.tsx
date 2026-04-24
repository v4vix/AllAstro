import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StarfieldCanvas } from './components/StarfieldCanvas'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { BetaAccess } from './pages/BetaAccess'
import { AdminProvider } from './lib/AdminContext'

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-void overflow-hidden">
          <StarfieldCanvas />
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/beta" element={<BetaAccess />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AdminProvider>
  )
}

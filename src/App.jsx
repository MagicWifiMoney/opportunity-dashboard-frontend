import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import OpportunityList from '@/components/OpportunityList'
import OpportunityDetail from '@/components/OpportunityDetail'
import SearchPage from '@/components/SearchPage'
import SettingsPage from '@/components/SettingsPage'
import SyncStatus from '@/components/SyncStatus'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Router>
      <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen} 
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/opportunities" element={<OpportunityList />} />
                <Route path="/opportunities/:id" element={<OpportunityDetail />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/sync" element={<SyncStatus />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </main>
        </div>
        
        <Toaster />
      </div>
    </Router>
  )
}

export default App


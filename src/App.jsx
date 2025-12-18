import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ClassDetail from './pages/ClassDetail'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedClass, setSelectedClass] = useState(null)

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setCurrentView('detail')
  }

  const handleBack = () => {
    setCurrentView('dashboard')
    setSelectedClass(null)
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
    if (view === 'dashboard') {
      setSelectedClass(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard onClassSelect={handleClassSelect} />
            </motion.div>
          )}
          
          {currentView === 'detail' && selectedClass && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ClassDetail classData={selectedClass} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App

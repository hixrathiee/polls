import Navbar from './components/Navbar'
import AllResults from './pages/AllResults'
import CreatePolls from './pages/CreatePolls'
import Home from './pages/Home'
import PollDetails from './pages/PollDetails'
import Results from './pages/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePolls />} />
        <Route path="/poll/:id" element={<PollDetails />} />  
        <Route path="/results/:id" element={<Results />} />   
        <Route path="/results" element={<AllResults />} />
      </Routes>
    </Router>
  )
}

export default App

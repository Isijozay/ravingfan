import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import BusinessSetup from './pages/BusinessSetup';
import BusinessDashboard from './pages/BusinessDashboard';
import PersonalDashboard from './pages/PersonalDashboard';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/business/setup" element={<BusinessSetup />} />
            <Route path="/business/dashboard" element={<BusinessDashboard />} />
            <Route path="/dashboard" element={<PersonalDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
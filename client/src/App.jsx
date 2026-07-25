import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseNotes from './pages/BrowseNotes';
import DoubtFeed from './pages/DoubtFeed';
import DoubtDetail from './pages/DoubtDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<BrowseNotes />} />
        <Route path="/doubts" element={<DoubtFeed />} />
        <Route path="/doubts/:id" element={<DoubtDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
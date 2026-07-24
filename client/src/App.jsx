import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BrowseNotes from './pages/BrowseNotes';
import DoubtFeed from './pages/DoubtFeed';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 bg-gray-800 text-white">
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/doubts">Doubts</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<BrowseNotes />} />
        <Route path="/doubts" element={<DoubtFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white">
      <Link to="/">Home</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/doubts">Doubts</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default Navbar;
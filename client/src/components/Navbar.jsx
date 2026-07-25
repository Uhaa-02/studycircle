import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <Link to="/">Home</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/doubts">Doubts</Link>
      <Link to="/profile">Profile</Link>
      {token ? (
        <button onClick={handleLogout} className="ml-auto text-red-300 hover:underline">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="ml-auto">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
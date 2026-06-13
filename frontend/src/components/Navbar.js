import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const user = localStorage.getItem('userName');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">🛒 ShopEasy</Link>
      <div className="ms-auto d-flex align-items-center gap-3">
        <Link className="text-white text-decoration-none" to="/cart">
          Cart <span className="badge bg-warning text-dark">{cartCount}</span>
        </Link>
        {user ? (
          <>
            <span className="text-white">Hi, {user}</span>
            <Link className="text-white text-decoration-none" to="/orders">My Orders</Link>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-sm btn-outline-light" to="/login">Login</Link>
            <Link className="btn btn-sm btn-warning" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
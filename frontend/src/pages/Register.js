import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMsg('Registered! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setMsg('Registration failed. Email may already exist.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-4">Create Account</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" required
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
      <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
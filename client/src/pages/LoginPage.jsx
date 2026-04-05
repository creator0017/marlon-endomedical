import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [role, setRole] = useState('user');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    navigate('/dashboard');
  };

  return (
    <section className="section" style={{ padding: '8rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>lock_person</span>
          <h1 className="headline-md" style={{ marginBottom: '0.5rem' }}>Partner Portal Login</h1>
          <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
            Access the procurement dashboard and wholesale features.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input type="email" placeholder="Email Address" className="input input--glass" required defaultValue="demo@hospital.com" />
            <input type="password" placeholder="Password" className="input input--glass" required defaultValue="password" />
            
            <div style={{ textAlign: 'left', marginTop: '0.5rem' }}>
              <label className="label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: '0.5rem' }}>Login As:</label>
              <select className="input input--glass" value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Hospital Procurement / Buyer</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <button type="submit" className="btn btn--primary btn--lg" style={{ marginTop: '1rem' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section className="section" style={{ padding: '4rem 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 className="display-sm">Dashboard</h1>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Welcome back, <strong style={{ color: 'var(--primary-fixed-dim)' }}>{user.username}</strong>
            </p>
          </div>
          <button onClick={logout} className="btn glass-panel" style={{ color: '#ff5c5c' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>logout</span>
            Logout
          </button>
        </div>

        {user.role === 'admin' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>inventory</span>
              <h2 className="headline-sm">Product Management</h2>
              <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>Add new products, update prices, and manage stock levels.</p>
              <button className="btn btn--primary" style={{ width: '100%' }}>Manage Products</button>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>request_quote</span>
              <h2 className="headline-sm">Quote Requests</h2>
              <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>Review hospital procurement requests and issue invoices.</p>
              <button className="btn btn--primary" style={{ width: '100%' }}>View Quotes (3 New)</button>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>article</span>
              <h2 className="headline-sm">CMS & Content</h2>
              <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>Publish new blog articles and update the partner network.</p>
              <button className="btn btn--primary" style={{ width: '100%' }}>Manage Content</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>history</span>
              <h2 className="headline-sm">Order History</h2>
              <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>View past quotes, invoices, and shipment tracking.</p>
              <button className="btn btn--primary" style={{ width: '100%' }}>View Orders</button>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>receipt_long</span>
              <h2 className="headline-sm">Pending Quotes</h2>
              <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>You have 1 pending quote request under review by Marlon Endomedical.</p>
              <button className="btn btn--primary" style={{ width: '100%' }}>Check Status</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

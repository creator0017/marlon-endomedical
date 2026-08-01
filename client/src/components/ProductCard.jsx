import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {

  return (
    <div className="product-card card" id={`product-card-${product.slug || product._id}`}>
      <Link to={`/products/${product.slug}`} className="product-card__image-link" style={{ display: 'block' }}>
        <div className="card__image-wrap">
          {product.image ? (
            <img src={product.image} alt={product.name} loading="lazy" />
          ) : (
            <div className="card__image-placeholder" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              background: 'var(--surface-container-high)',
              color: 'var(--on-surface-variant)',
              minHeight: '200px'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', opacity: 0.5 }}>medical_services</span>
            </div>
          )}
          {product.inStock && <div className="card__badge">In Stock</div>}
        </div>
      </Link>
      <div className="card__body">
        <Link to={`/products/${product.slug}`} className="product-card__title-link" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <h4 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.25rem', transition: 'color var(--transition-fast)' }} className="product-card__title">
            {product.name}
          </h4>
          <div className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
            {product.subtitle}
          </div>
        </Link>
        <div className="card__footer">
          <div className="product-card__price">{product.price || 'POA'}</div>
          <Link
            to={`/products/${product.slug}`}
            className="btn btn--secondary"
            id={`inquiry-btn-${product.slug || product._id}`}
            style={{ borderRadius: 'var(--radius-md)', padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem' }}
          >
            <span>View Details</span>
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

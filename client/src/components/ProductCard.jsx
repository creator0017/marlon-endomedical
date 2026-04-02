import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card card" id={`product-card-${product.slug || product._id}`}>
      <div className="card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.inStock && <div className="card__badge">In Stock</div>}
      </div>
      <div className="card__body">
        <h4 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.25rem' }}>
          {product.name}
        </h4>
        <div className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
          {product.subtitle}
        </div>
        <div className="card__footer">
          <div className="product-card__price">{product.price || 'POA'}</div>
          <Link
            to={`/products/${product.slug}`}
            className="product-card__inquiry"
            id={`inquiry-btn-${product.slug || product._id}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>add_shopping_cart</span>
            Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}

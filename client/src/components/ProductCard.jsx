import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.slug === product.slug);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

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
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Add to quote basket */}
            <button
              onClick={handleAddToCart}
              className={`product-card__inquiry ${inCart || added ? 'btn--primary' : ''}`}
              title={inCart ? 'In quote basket' : 'Add to quote basket'}
              id={`cart-btn-${product.slug || product._id}`}
              style={{ borderRadius: 'var(--radius-md)', padding: '0.4rem 0.625rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>
                {added ? 'check' : inCart ? 'shopping_cart' : 'add_shopping_cart'}
              </span>
              {added ? 'Added' : inCart ? 'In Cart' : 'Add'}
            </button>
            {/* View details */}
            <Link
              to={`/products/${product.slug}`}
              className="product-card__inquiry"
              id={`inquiry-btn-${product.slug || product._id}`}
              style={{ borderRadius: 'var(--radius-md)', padding: '0.4rem 0.625rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>open_in_new</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

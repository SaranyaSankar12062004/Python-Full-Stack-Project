export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image_url || 'https://via.placeholder.com/300'}
        className="card-img-top" alt={product.name} style={{ height: 200, objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2" style={{ width: 'fit-content' }}>{product.category}</span>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success fs-5">₹{product.price}</span>
          <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
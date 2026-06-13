import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    getProducts(search, category)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [search, category]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Products</h2>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="Search products..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(p => (
          <div key={p.id} className="col">
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </div>
        ))}
        {products.length === 0 && <p className="text-muted">No products found.</p>}
      </div>
    </div>
  );
}
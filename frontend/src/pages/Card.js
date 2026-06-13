import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

export default function Cart({ cart, onRemove, onClear }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    try {
      const items = cart.map(item => ({ product_id: item.id, quantity: item.qty }));
      await createOrder({ items });
      alert('Order placed successfully!');
      onClear();
      navigate('/orders');
    } catch {
      alert('Checkout failed. Please login first.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">{item.name}</h5>
                <small className="text-muted">Qty: {item.qty} × ₹{item.price}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="fw-bold">₹{item.price * item.qty}</span>
                <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="text-end mt-3">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-success btn-lg mt-2" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
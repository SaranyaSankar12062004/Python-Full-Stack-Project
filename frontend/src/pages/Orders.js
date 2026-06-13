import { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';

const statusColor = { pending: 'warning', confirmed: 'info', delivered: 'success' };

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(res => setOrders(res.data)).catch(console.error);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted">No orders placed yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="card mb-3 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Order #{order.id}</h5>
                <small className="text-muted">Total: ₹{order.total}</small>
              </div>
              <span className={`badge bg-${statusColor[order.status] || 'secondary'} fs-6`}>
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
import React from 'react';

const OrderList = ({ orders, selectOrder }) => {
    return (
        <div className="order-list">
            <h3>Order List</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => selectOrder(order)}>
                        <span>Order ID: {order.id}</span>
                        <span>User ID: {order.userId}</span>
                        <span>Total: {order.total.toFixed(2)}</span>
                        <span>Status: {order.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;

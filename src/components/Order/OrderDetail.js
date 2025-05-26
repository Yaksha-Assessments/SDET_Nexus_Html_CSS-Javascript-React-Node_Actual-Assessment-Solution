import React from 'react';

const OrderDetail = ({ order }) => {
    return (
        <div className="order-detail">
            <h3>Order Detail</h3>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total:</strong> {order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h4>Books:</h4>
            <ul>
                {order.books.map(book => (
                    <li key={book.id}>
                        <span>{book.title}</span>
                        <span> by {book.author}</span>
                        <span> - {book.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetail;

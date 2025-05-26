import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:4000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>User ID:</strong> {order.userId} <br />
                        <strong>Total:</strong> ${order.total} <br />
                        <strong>Books:</strong>
                        <ul>
                            {order.books.map((book) => (
                                <li key={book.id}>{book.title} by {book.author} (${book.price})</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOrderList;

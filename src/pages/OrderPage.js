import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import OrderList from '../components/Order/OrderList';
import OrderDetail from '../components/Order/OrderDetail';
import { AuthContext } from '../App';

function OrderPage() {
    const { auth } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response;
                if (auth.role === 'admin') {
                    response = await axios.get('http://localhost:4000/orders');
                } else {
                    response = await axios.get(`http://localhost:4000/orders?userId=${auth.id}`);
                }
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [auth]);

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div>
            <h3>Orders</h3>
            <OrderList orders={orders} selectOrder={handleOrderSelect} />
            {selectedOrder && <OrderDetail order={selectedOrder} />}
        </div>
    );
}

export default OrderPage;

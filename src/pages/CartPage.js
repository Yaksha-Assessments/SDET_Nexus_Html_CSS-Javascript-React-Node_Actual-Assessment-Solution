import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

const CartPage = () => {
    const { auth } = useContext(AuthContext);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!auth) return;

            try {
                const response = await axios.get(`http://localhost:4000/cart?userId=${auth.id}`);
                setCart(response.data[0] || { userId: auth.id, books: [] });
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [auth]);

    if (!auth) {
        return <p>Loading...</p>;
    }

    if (!cart) {
        return <p>No items in the cart.</p>;
    }

    const handleRemoveBook = async (bookId) => {
        const updatedBooks = cart.books.filter(book => book.id !== bookId);

        const updatedCart = {
            ...cart,
            books: updatedBooks
        };

        try {
            await axios.put(`http://localhost:4000/cart/${cart.id}`, updatedCart);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing book from cart:', error);
        }
    };

    const handlePlaceOrder = async () => {
        const order = {
            userId: auth.id,
            books: cart.books,
            total: cart.books.reduce((sum, book) => sum + book.price * book.quantity, 0),
            status: 'confirmed'
        };

        try {
            await axios.post('http://localhost:4000/orders', order);
            await axios.delete(`http://localhost:4000/cart/${cart.id}`);
            setCart({ userId: auth.id, books: [] });
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <h3>Your Cart</h3>
            <ul>
                {cart.books.map(book => (
                    <li key={book.id}>
                        <span>{book.title}</span>
                        <span> by {book.author}</span>
                        <span> - {book.price.toFixed(2)}</span>
                        <span> x {book.quantity}</span>
                        <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            {cart.books.length > 0 && (
                <div>
                    <h4>Total: {cart.books.reduce((sum, book) => sum + book.price * book.quantity, 0).toFixed(2)}</h4>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;

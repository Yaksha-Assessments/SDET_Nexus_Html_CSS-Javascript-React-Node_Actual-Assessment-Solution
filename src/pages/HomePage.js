import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookList from '../components/Book/BookList';
import { AuthContext } from '../App';

const HomePage = () => {
    const { auth } = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const addToCart = async (book) => {
        if (!auth) return;

        try {
            const response = await axios.get(`http://localhost:4000/cart?userId=${auth.id}`);
            let userCart = response.data[0];

            if (!userCart) {
                // Create a new cart if it doesn't exist
                userCart = {
                    userId: auth.id,
                    books: [{ ...book, quantity: 1 }]
                };
                await axios.post('http://localhost:4000/cart', userCart);
            } else {
                // Check if the book is already in the cart
                const bookIndex = userCart.books.findIndex(cartBook => cartBook.id === book.id);

                if (bookIndex > -1) {
                    // Increase the quantity of the existing book
                    userCart.books[bookIndex].quantity += 1;
                } else {
                    // Add the new book with quantity 1
                    userCart.books.push({ ...book, quantity: 1 });
                }

                await axios.put(`http://localhost:4000/cart/${userCart.id}`, userCart);
            }

            alert('Book added to cart!');
        } catch (error) {
            console.error('Error adding book to cart:', error);
        }
    };

    return (
        <div>
            <h2>Welcome to the Online Bookstore</h2>
            <BookList books={books} addToCart={auth?.role === 'user' ? addToCart : null} />
        </div>
    );
};

export default HomePage;

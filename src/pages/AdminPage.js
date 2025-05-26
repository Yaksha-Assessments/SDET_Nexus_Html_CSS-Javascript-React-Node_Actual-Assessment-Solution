import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import BookList from '../components/Book/BookList';
import BookForm from '../components/Book/BookForm';

const AdminPage = () => {
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        // Fetch non-admin users
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                const nonAdminUsers = response.data.filter(user => user.role !== 'admin');
                setUsers(nonAdminUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Fetch books
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchUsers();
        fetchBooks();
    }, []);

    const handleBookSelect = (book) => {
        setSelectedBook(book);
    };

    const handleBookCreate = async (book) => {
        try {
            const response = await axios.post('http://localhost:4000/books', book);
            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleBookDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:4000/books/${bookId}`);
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="admin-page">
            <h2>Admin Panel</h2>

            <section>
                <h3>Users</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username} ({user.role})
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Books</h3>
                <BookForm addBook={handleBookCreate} />
                <BookList books={books} selectBook={handleBookSelect} deleteBook={handleBookDelete} />
            </section>
        </div>
    );
};

export default AdminPage;

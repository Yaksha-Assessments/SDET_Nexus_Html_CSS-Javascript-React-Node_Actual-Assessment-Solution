import React, { useState, useEffect } from 'react';

const BookForm = ({ addBook, editBook, updateBook }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (editBook) {
            setBook({ ...editBook });
        } else {
            setBook({
                title: '',
                author: '',
                price: '',
                description: ''
            });
        }
    }, [editBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editBook) {
            updateBook(book);
        } else {
            addBook(book);
        }
        setBook({
            title: '',
            author: '',
            price: '',
            description: ''
        });
    };

    return (
        <div className="book-form">
            <h3>{editBook ? 'Edit Book' : 'Add a Book'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{editBook ? 'Update Book' : 'Add Book'}</button>
            </form>
        </div>
    );
};

export default BookForm;

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { auth, login } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (auth) {
            history.push('/');
        }
    }, [auth, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:4000/users', {
                params: {
                    username: credentials.username,
                    password: credentials.password,
                },
            });

            const user = response.data[0];
            if (user) {
                login(user);
                if (user.role === 'admin') {
                    history.push('/admin');
                } else {
                    history.push('/');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

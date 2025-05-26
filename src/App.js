import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

export const AuthContext = React.createContext();

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (user) => {
    setAuth(user);
    localStorage.setItem('auth', JSON.stringify(user));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/admin">
              {auth && auth.role === 'admin' ? <AdminPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/cart">
              {auth && auth.role === 'user' ? <CartPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/orders">
              {auth && auth.role === 'admin' ? <OrderPage /> : <Redirect to="/login" />}
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

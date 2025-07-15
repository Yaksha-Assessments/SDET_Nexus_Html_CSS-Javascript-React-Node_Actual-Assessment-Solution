import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';

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
            <Route path="/cart">
              {auth && auth.role === 'user' ? <CartPage /> : <Redirect to="/login" />}
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

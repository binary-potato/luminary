import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import Chat from './Chat';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <div>
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </nav>
          <Chat token={token} />
        </div>
      )}
    </div>
  );
}

export default App;
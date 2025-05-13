// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './helper/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Provider
      store={store}
    >
      {/* <ToastContainer autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}  // 👈 This prevents the crash
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover /> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
    </AuthProvider>

  );
}

export default App;

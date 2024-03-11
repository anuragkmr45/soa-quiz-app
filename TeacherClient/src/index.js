import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { FirestoreProvider } from './context/FirestoreContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirestoreProvider>
        <App />
      </FirestoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AnimatePresence>
            <Provider store={ store }>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AnimatePresence>
    </React.StrictMode>
);
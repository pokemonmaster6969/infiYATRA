import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
=======
import App from '../infiland'
>>>>>>> 2c9a9e5 (initial commit with large files)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
<<<<<<< HEAD
        <HelmetProvider>
            <ErrorBoundary>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ErrorBoundary>
        </HelmetProvider>
=======
        <BrowserRouter>
            <App />
        </BrowserRouter>
>>>>>>> 2c9a9e5 (initial commit with large files)
    </React.StrictMode>,
)

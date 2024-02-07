import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'
import Provider from './lib/Providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
    <App />
    </Provider>
    <Toaster />
  </React.StrictMode>,
)

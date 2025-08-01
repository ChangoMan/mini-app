import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { Providers } from './providers'

import '@coinbase/onchainkit/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)

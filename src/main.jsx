import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/Contextshare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextShare>
        <GoogleOAuthProvider clientId="170878173856-b2qia3lb2fh8s13ln2gkkn47hgsfq3dp.apps.googleusercontent.com">
          <AuthContext>
            <App />
          </AuthContext>
        </GoogleOAuthProvider>
      </ContextShare>
    </BrowserRouter>
  </StrictMode>,
)


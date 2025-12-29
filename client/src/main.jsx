import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify'
import { PostsProvider } from './components/PostContext'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'

const persistor = persistStore(store); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <AuthProvider>
    <PostsProvider >
  
    <ToastContainer />
    <App />
  </PostsProvider>
  </AuthProvider>
  </PersistGate>
  </Provider>
  </StrictMode>
)

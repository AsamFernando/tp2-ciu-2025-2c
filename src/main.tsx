import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './components/index.ts'
import TagsProvider from './components/UserProvider/TagProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <TagsProvider>
    <UserProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>,
      </BrowserRouter>
    </UserProvider>
  </TagsProvider>
)

import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);

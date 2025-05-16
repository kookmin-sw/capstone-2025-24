import { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';

const App = () => {
  useEffect(() => {
    sessionStorage.removeItem('highlightConsumed');
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
};

export default App;

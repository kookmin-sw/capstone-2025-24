import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';
import { useSSE } from '@/hooks/useSSE';

const App = () => {
  useSSE();

  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
};

export default App;

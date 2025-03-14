import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
};

export default App;

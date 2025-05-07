import { Container, Typography } from '@mui/material';
import CompetitorManagement from './features/CompetitorManagement';

function App() {
  return (
    <Container>
      <Typography variant='body1' gutterBottom>
        This or That Admin Portal
      </Typography>
      <CompetitorManagement />
    </Container>
  );
}

export default App;

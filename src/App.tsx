import { Container, Typography } from '@mui/material';
import CompetitorList from './components/CompetitorList';

function App() {
  return (
    <Container>
      <Typography variant='body1' gutterBottom>
        This or That Admin Portal
      </Typography>
      <CompetitorList />
    </Container>
  );
}

export default App;

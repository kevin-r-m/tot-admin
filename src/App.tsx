import { Container } from '@mui/material';
import CompetitorManagement from './features/CompetitorManagement';
import Header from './features/Header';

function App() {
    return (
        <>
            <Header />
            <Container>
                <CompetitorManagement />
            </Container>
        </>
    );
}

export default App;

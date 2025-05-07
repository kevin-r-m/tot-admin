import { Paper, Typography } from '@mui/material';

export default function PickACompetitor() {
  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        padding: 2,
        flex: 0.5,
      }}>
      <Typography variant='h4'>
        Pick a competitor below to see available actions
      </Typography>
    </Paper>
  );
}

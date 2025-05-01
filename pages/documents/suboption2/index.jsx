import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

export default function SubOption2() {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 48px)', 
        textAlign: 'center',
      }}
    >
      <Typography variant='h4' fontFamily={"serif"} color='rgb(76 78 100 / 87%)'>
        Welcome to SubOption2 
      </Typography>
    </Stack>
  );
}
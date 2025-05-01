import { Box } from "@mui/material";
import CollapsibleLibrary from './sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden'}}>
      <CollapsibleLibrary />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          overflow: 'auto',
          height: { xs: 'calc(100vh - 56px)', lg: '100vh' },
          mt: { xs: '16px', lg: 0 }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
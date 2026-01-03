import { useState } from 'react';
import './App.css';
import { 
  Box, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Snackbar, 
  Alert,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  Send as SendIcon, 
  ContentCopy as CopyIcon, 
  AutoAwesome as MagicIcon 
} from '@mui/icons-material';
import axios from 'axios';
import logo from './assets/mailpilot.png'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#1a2027',
    },
    h6: {
      fontWeight: 600,
      color: '#333',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        }
      }
    }
  },
});

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setSnackbarMsg('Reply copied to clipboard!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMsg('Failed to copy to clipboard');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      
      {/* App Header Bar (Optional but looks nice) */}
      <Box sx={{ width: '100%', height: '150px', bgcolor: 'primary.main', position: 'absolute', top: 0, zIndex: -1 }} />

      <Container maxWidth="md" sx={{ py: 4, mt: 4 }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, color: 'white' }}>
           {/* Logo Display */}
          <Box 
            component="img"
            sx={{ 
              height: 50, 
              width: 50, 
              mr: 2, 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }}
            alt="Mailpilot Logo"
            src={logo}
          />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Mailpilot
          </Typography>
        </Box>

        {/* Main Card */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Original Email
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            placeholder="Paste the email content you received here..."
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <FormControl fullWidth>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone || ''}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="witty">Witty</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant='contained'
              size="large"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <MagicIcon />}
              sx={{ minWidth: '200px', height: '56px' }}
            >
              {loading ? "Generating..." : "Generate Reply"}
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
          )}

          {/* Generated Output Section */}
          {generatedReply && (
            <Box sx={{ mt: 4, p: 0, animation: 'fadeIn 0.5s ease-in' }}>
               <Typography variant="h6" gutterBottom color="primary">
                Generated Reply
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={8}
                variant='outlined'
                value={generatedReply || ''}
                inputProps={{ readOnly: true }}
                sx={{ 
                  mb: 2, 
                  backgroundColor: '#f8f9fa' // Slightly different bg to indicate read-only
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<CopyIcon />}
                  onClick={handleCopy}
                >
                  Copy to Clipboard
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<SendIcon />}
                  onClick={() => window.location.href = `mailto:?body=${encodeURIComponent(generatedReply)}`}
                >
                  Open in Mail
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          Powered by Mailpilot AI
        </Typography>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>

      </Container>
    </ThemeProvider>
  );
}

export default App;
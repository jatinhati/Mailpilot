import { useState } from 'react'
import './App.css'
import { CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Typography, Snackbar, Alert } from '@mui/material'; 
import { Box, TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';


function App() {
  const[emailContent, setEmailContent] = useState('');
  const[tone, setTone] = useState('');
  const[generatedReply, setGeneratedReply] = useState('');
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');
  const[snackbarOpen, setSnackbarOpen] = useState(false);
  const[snackbarMsg, setSnackbarMsg] = useState('');
  const[snackbarSeverity, setSnackbarSeverity] = useState('success');

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
    }finally {
      setLoading(false);
    }
  }
  

  return (
    <Container maxWidth="md" sx={{py:4}}>
     <Typography variant="h3" component="h1" gutterBottom> 
     Email Reply Generator
     </Typography>

    <Box sx={{my:3}}>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        label="Original Email Content"
        value={emailContent || ''}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{mb:2}}
      />

      <FormControl fullWidth sx={{mb:2}}>
        <InputLabel>Tone(Optional)</InputLabel>
        <Select
          value={tone || ''}
          label="Tone(Optional)"
          onChange={(e) => setTone(e.target.value)}
        >
          <MenuItem value="None">None </MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loading}
        >
        {loading ? <CircularProgress size={24} /> : "Generate Reply" }
      </Button>
    </Box>
    {error && (
      <Typography color="error" sx={{mb:2}}>
        {error}
      </Typography>
    )}
    {generatedReply && (
      <Box sx={{mt:3}}>
        <Typography variant="h6" gutterBottom>Generated Reply:</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        value={generatedReply || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <Button 
        variant="outlined"
        sx={{mt:2}}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(generatedReply);
            setSnackbarMsg('Copied to clipboard');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
          } catch (err) {
            setSnackbarMsg('Failed to copy to clipboard');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        }}>
        Copy to Clipboard
      </Button> 
      </Box>
    )}
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
  )
}

export default App

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import OpenAI from 'openai';

const openai = new OpenAI({
  organization: import.meta.env.VITE_OPENAI_ORG_ID,
  project: import.meta.env.VITE_OPENAI_PROJ_ID,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function DialogAddCompetitor({ onClose, open }: SimpleDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setName('');
    setDescription('');
    onClose();
  }

  async function getAI() {
    try {
      setIsLoading(true);
      const thread = await openai.beta.threads.create();

      await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: name,
      });

      const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
      });

      if (run.status === 'completed') {
        const latestMessage = await openai.beta.threads.messages.list(
          run.thread_id,
          {
            limit: 1,
            role: 'assistant',
          }
        );

        if (latestMessage && latestMessage.data.length > 0) {
          setDescription(latestMessage.data[0].content[0].text.value);
        }
      }
    } catch (error) {
      console.error('Error in getAI function:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ component: 'form' }}>
      <DialogTitle>Add competitor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin='dense'
          id='description'
          label='Description'
          type='text'
          fullWidth
          rows={6}
          multiline
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  title='Auto-generate'
                  disabled={!name || isLoading}
                  onClick={getAI}>
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AutoAwesomeIcon color={name ? 'primary' : 'disabled'} />
                  )}
                </IconButton>
              ),
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit'>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddCompetitor;

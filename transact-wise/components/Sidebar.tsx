// components/Sidebar.tsx
import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';

type SetCurrentPageType = (page: 'accounts' | 'transactions') => void;

type SidebarProps = {
  setCurrentPage: SetCurrentPageType;
};

const Sidebar = ({ setCurrentPage }: SidebarProps) => {
  const { user } = useUser();
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false); // Add this line

  const handleSubmitQuestion = async () => {
    try {
      setAnswer(''); // Clear previous answer
      setLoading(true); // Set loading state
  
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setAnswer(data.text);
      setQuestion('');
    } catch (error) {
      setAnswer('Error fetching data');
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <nav className="text-white">
      <div className="p-4">
        <p>Hello, {user ? user.firstName || user.username : "stranger"}!</p>
        <Button variant="contained" onClick={() => setChatOpen(true)}>
          Open Q&A Chat
        </Button>
      </div>
      <ul>
        <li className="p-2 hover:bg-gray-700" onClick={() => setCurrentPage('accounts')}>
          Accounts
        </li>
        <li className="p-2 hover:bg-gray-700" onClick={() => setCurrentPage('transactions')}>
          Transactions
        </li>
      </ul>

      <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Document Q&A Chat</DialogTitle>
        <DialogContent>
          <TextField
            label="Ask a question"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitQuestion(); }}
          />
          {answer && <p>Answer: {answer}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitQuestion}>Submit</Button>
          <Button onClick={() => setChatOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </nav>
  );
};

export default Sidebar;

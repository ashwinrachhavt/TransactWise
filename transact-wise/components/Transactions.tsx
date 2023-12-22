// Import the Supabase client
import {createClient} from '@/utils/supabase/client';

// Import other React dependencies
import React, { useRef, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
  category: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const fileInputRef = useRef(null);
  const supabase = createClient();
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');


  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  useEffect(() => {
    fetch("/api/transactions")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data); // Log the received data
        if (data && Array.isArray(data)) {
          setTransactions(data);
          const uniqueCategories = Array.from(new Set(data.map((t: Transaction) => t.category)));
          setCategories(uniqueCategories);
        } else {
          setError("Invalid data format received from the API");
        }
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTextPrediction = async (description: string, id: number) => {
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: description })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Update the specific transaction with the prediction result
      setTransactions(transactions.map(t => t.id === id ? { ...t, predictedCategory: data.predicted_label } : t));
    } catch (error) {
      console.error('Error predicting text:', error);
    }
  };


  const handleSubmitQuestion = async () => {
    const response = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(data.text);
  };
  


  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const bucket = "transactions"

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    // Handle error if upload failed
    if(error) {
      alert('Error uploading file.', error.message);
      return;
    }

    alert('File uploaded successfully!');
  };



  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

      {/* <h1>Upload Profile Photo</h1>
      <input type="file" onChange={uploadFile} /> */}
    

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Balance</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Predict</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.Date}</TableCell>
            <TableCell>{transaction.Description}</TableCell>
            <TableCell>{transaction.Amount}</TableCell>
            <TableCell>{transaction.Balance}</TableCell>
            <TableCell>{transaction.Category}</TableCell>
            <TableCell>
              <Button onClick={() => handleTextPrediction(transaction.Description, transaction.id)}>
                Predict
              </Button>
              {transaction.predictedCategory && <span>{transaction.predictedCategory}</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {/* <Button onClick={() => setChatOpen(true)}>Open Q&A Chat</Button>

    <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Document Q&A Chat</DialogTitle>
      <DialogContent>
        <TextField
          label="Ask a question"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {answer && <p>Answer: {answer}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitQuestion}>Submit</Button>
        <Button onClick={() => setChatOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog> */}

    </div>
  );
};

export default Transactions;

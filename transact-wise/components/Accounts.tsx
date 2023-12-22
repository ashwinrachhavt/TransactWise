import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

interface AccountCardProps {
  title: string;
  description: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ title, description }) => (
  <Card sx={{ minWidth: 275, margin: 2, backgroundColor: '#f5f5f5' }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

const Accounts: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <AccountCard title="Credit Account" description="20000.1" />
      <AccountCard title="Debit Account" description="100.24" />
      <AccountCard title="Savings Account" description="8000" />
    </div>
  );
};

export default Accounts;

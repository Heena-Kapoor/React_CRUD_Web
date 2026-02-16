import React, { useState, useEffect } from 'react';
import { Box, Modal, Fade, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { deleteUser, fetchUsers } from './services/api';

const PageHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1, 3),
  backgroundColor: '#f9fafb',
}));

const Title = styled('h1')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: '#101828',
  margin: 0,
  marginBottom: theme.spacing(0.5),
}));

const Subtitle = styled('p')(({ theme }) => ({
  fontSize: '1rem',
  color: '#475467',
  margin: 0,
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  maxWidth: '800px',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  outline: 'none',

  [theme.breakpoints.down('sm')]: {
    maxHeight: '100vh',
    borderRadius: 0,
    height: '100%',
  },
}));

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async () => {
    await loadUsers();
    setEditingUser(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <Box>
      <PageHeader>
        <Title>User Management</Title>
        <Subtitle>
          {users.length} {users.length === 1 ? 'user' : 'users'} registered
        </Subtitle>
      </PageHeader>

      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onAdd={handleAddNew}
        onDelete={handleDelete}
      />

      <StyledModal
        open={showForm || !!editingUser}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(52, 64, 84, 0.7)' },
        }}
      >
        <Fade in={showForm || !!editingUser}>
          <ModalContent>
            <UserForm user={editingUser} onSave={handleSave} onCancel={handleCancel} />
          </ModalContent>
        </Fade>
      </StyledModal>
    </Box>
  );
}

export default App;
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers, deleteUser } from '../services/api';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
}));

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.875rem',
  fontWeight: 600,
  color: '#101828',
  marginBottom: theme.spacing(0.5),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#475467',
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  width: '320px',
  backgroundColor: '#ffffff',
  
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    
    '&:hover fieldset': {
      borderColor: '#d0d5dd',
    },
    
    '&.Mui-focused fieldset': {
      borderColor: '#7f56d9',
      borderWidth: '1px',
    },
  },
  
  '& .MuiInputBase-input': {
    padding: '10px 14px',
    fontSize: '0.875rem',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7f56d9',
  color: '#ffffff',
  padding: '10px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
  
  '&:hover': {
    backgroundColor: '#6941c6',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #eaecf0',
  boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f9fafb',
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#475467',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: '12px 24px',
  borderBottom: '1px solid #eaecf0',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#101828',
  padding: '16px 24px',
  borderBottom: '1px solid #eaecf0',
}));

const UserCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: '#7f56d9',
  fontSize: '0.875rem',
  fontWeight: 600,
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#101828',
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#475467',
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  height: '22px',
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '6px',
  backgroundColor: '#ecfdf3',
  color: '#027a48',
  border: 'none',
  
  '& .MuiChip-label': {
    padding: '2px 8px',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: '#475467',
  padding: '8px',
  
  '&:hover': {
    backgroundColor: '#f9fafb',
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
}));

const EmptyStateText = styled(Typography)(({ theme }) => ({
  color: '#475467',
  fontSize: '0.875rem',
  marginTop: theme.spacing(1),
}));

const UserList = ({ onEdit, onAdd }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = users.filter(user => 
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.emailAddress?.toLowerCase().includes(query) ||
      user.phoneNumber?.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    if (selectedUser) {
      onEdit(selectedUser);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedUser && window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(selectedUser.id);
        loadUsers();
      } catch (err) {
        alert('Error deleting user: ' + err.message);
      }
    }
    handleMenuClose();
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return (first + last).toUpperCase() || '?';
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <CircularProgress sx={{ color: '#7f56d9' }} />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>User Management</Title>
        <Subtitle>Manage your team members and their account permissions</Subtitle>
      </Header>

      <Toolbar>
        <SearchField
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#667085', fontSize: '1.25rem' }} />
              </InputAdornment>
            ),
          }}
        />
        
        {onAdd && (
          <AddButton
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add User
          </AddButton>
        )}
      </Toolbar>

      {filteredUsers.length === 0 ? (
        <StyledTableContainer component={Paper}>
          <EmptyState>
            <Typography variant="h6" sx={{ color: '#101828', fontWeight: 600 }}>
              No users found
            </Typography>
            <EmptyStateText>
              {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first user'}
            </EmptyStateText>
          </EmptyState>
        </StyledTableContainer>
      ) : (
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableHeadCell>User</StyledTableHeadCell>
                <StyledTableHeadCell>Status</StyledTableHeadCell>
                <StyledTableHeadCell>Phone</StyledTableHeadCell>
                <StyledTableHeadCell align="right">Actions</StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f9fafb',
                    },
                    '&:last-child td': {
                      borderBottom: 0,
                    },
                  }}
                >
                  <StyledTableCell>
                    <UserCell>
                      <StyledAvatar>
                        {getInitials(user.firstName, user.lastName)}
                      </StyledAvatar>
                      <UserInfo>
                        <UserName>
                          {user.firstName} {user.lastName}
                        </UserName>
                        <UserEmail>{user.emailAddress}</UserEmail>
                      </UserInfo>
                    </UserCell>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StatusChip label="Active" variant="outlined" />
                  </StyledTableCell>
                  <StyledTableCell>
                    {user.phoneNumber || '—'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ActionButton onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVertIcon />
                    </ActionButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            minWidth: '160px',
          },
        }}
      >
        <MenuItem 
          onClick={handleEdit}
          sx={{ 
            fontSize: '0.875rem',
            color: '#344054',
            padding: '8px 12px',
          }}
        >
          <EditIcon sx={{ fontSize: '1rem', mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={handleDelete}
          sx={{ 
            fontSize: '0.875rem',
            color: '#d92d20',
            padding: '8px 12px',
          }}
        >
          <DeleteIcon sx={{ fontSize: '1rem', mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </PageContainer>
  );
};

export default UserList;
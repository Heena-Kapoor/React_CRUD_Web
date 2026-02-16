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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f9fafb',
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
  padding: '6px 10px',
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
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#475467',
  // textTransform: 'uppercase',
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
    maxWidth: '350px',
  },
}));

const DialogIconWrapper = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#fee2e2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 3, 1, 3),
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#101828',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(1, 3, 3, 3),
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#475467',
  // marginBottom: theme.spacing(1),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1, 2, 2, 2),
  gap: theme.spacing(1.5),
  flexDirection: 'row-reverse',
}));

const CancelDialogButton = styled(Button)(({ theme }) => ({
  color: '#344054',
  backgroundColor: '#ffffff',
  border: '1px solid #d0d5dd',
  padding: '10px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  flex: 1,

  '&:hover': {
    backgroundColor: '#f9fafb',
    border: '1px solid #d0d5dd',
  },
}));

const DeleteDialogButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#d92d20',
  color: '#ffffff',
  padding: '10px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  flex: 1,

  '&:hover': {
    backgroundColor: '#b91c1c',
  },
}));

const UserList = ({ users, loading, error, onEdit, onAdd, onDelete }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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
  };

  const handleEdit = () => {
    if (selectedUser) {
      onEdit(selectedUser);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser && onDelete) {
      onDelete(selectedUser.id);
    }

    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return (first + last).toUpperCase() || '?';
  };


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
          onClick={handleDeleteClick}
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

      <StyledDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <StyledDialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <DialogIconWrapper>
              <WarningAmberIcon sx={{ color: '#dc2626', fontSize: '1.5rem' }} />
            </DialogIconWrapper>
            <StyledDialogTitle id="delete-dialog-title">
              Delete User
            </StyledDialogTitle>
            <StyledDialogContentText id="delete-dialog-description">
              Are you sure you want to delete <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong>? This action cannot be undone.
            </StyledDialogContentText>
          </Box>
        </StyledDialogContent>
        <StyledDialogActions>
          <CancelDialogButton onClick={handleDeleteCancel}>
            Cancel
          </CancelDialogButton>
          <DeleteDialogButton onClick={handleDeleteConfirm} autoFocus>
            Delete
          </DeleteDialogButton>
        </StyledDialogActions>
      </StyledDialog>
    </PageContainer>
  );
};

export default UserList;
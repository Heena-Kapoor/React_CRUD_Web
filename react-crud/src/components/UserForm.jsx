import { Formik, Form, Field } from 'formik';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userFields, getValidationSchema } from '../config/fieldsConfig';
import { createUser, updateUser } from '../services/api';

const FormWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  boxShadow: 'none',
  position: 'relative',
  width: '100%',
}));

const FormHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: '1px solid #eaecf0',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: '#ffffff',
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  color: '#475467',
  padding: '8px',

  '&:hover': {
    backgroundColor: '#f9fafb',
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#101828',
  marginBottom: theme.spacing(0.25),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#475467',
}));

const FormContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#344054',
  marginBottom: theme.spacing(2),
}));

const FieldGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(3),
  alignItems: 'center',  

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#344054',
  },

  '& .MuiInputLabel-asterisk': {
    color: '#d92d20',
  },

  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',

    '& fieldset': {
      borderColor: '#d0d5dd',
    },

    '&:hover fieldset': {
      borderColor: '#98a2b3',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#7f56d9',
      borderWidth: '1px',
    },
  },

  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
    padding: '10px 14px',
    color: '#101828',
  },

  '& .MuiFormHelperText-root': {
    fontSize: '0.75rem',
    marginLeft: 0,
  },
}));

const FormFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: '1px solid #eaecf0',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  backgroundColor: '#ffffff',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: '#344054',
  backgroundColor: '#ffffff',
  border: '1px solid #d0d5dd',
  padding: '10px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',

  '&:hover': {
    backgroundColor: '#f9fafb',
    border: '1px solid #d0d5dd',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
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

  '&:disabled': {
    backgroundColor: '#e9d7fe',
    color: '#ffffff',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const UserForm = ({ user, onSave, onCancel }) => {
  const isEditing = !!user;

  const initialValues = userFields.reduce((acc, field) => {
    acc[field.name] = user ? user[field.name] : '';
    return acc;
  }, {});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await updateUser(user.id, values);
      } else {
        await createUser(values);
      }
      onSave();
    } catch (error) {
      alert('Error saving user: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper elevation={0}>
      <FormHeader>
        <BackButton onClick={onCancel}>
          <ArrowBackIcon />
        </BackButton>
        <HeaderContent>
          <Title>
            {isEditing ? 'Edit User' : 'Add New User'}
          </Title>
          <Subtitle>
            {isEditing
              ? 'Update user information and permissions'
              : 'Add a new team member to your organization'}
          </Subtitle>
        </HeaderContent>
      </FormHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormContent>
              <FormSection>
                <SectionTitle>Personal Information</SectionTitle>
                <FieldGrid>
                  {userFields.map((field) => (
                    <Box
                      key={field.name}
                      sx={{
                        gridColumn: field.fullWidth ? 'span 2' : 'span 1',
                      }}
                    >
                      <Field
                        name={field.name}
                        as={StyledTextField}
                        label={field.label}
                        type={field.type || 'text'}
                        fullWidth
                        variant="outlined"
                        required={field.required}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                        disabled={isSubmitting}
                        multiline={field.multiline}
                        rows={field.rows || 2}
                        inputProps={
                          field.name === 'phoneNumber'
                            ? {
                              inputMode: 'numeric',     
                              pattern: '[0-9]*',
                              maxLength: 10,
                            }
                            : {}
                        }
                        onInput={(e) => {
                          if (field.name === 'phoneNumber') {
                            e.target.value = e.target.value.replace(/\D/g, '');
                          }
                        }}
                      />
                    </Box>
                  ))}
                </FieldGrid>
              </FormSection>
            </FormContent>

            <FormFooter>
              <CancelButton
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </CancelButton>
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (isEditing ? 'Updating...' : 'Creating...')
                  : (isEditing ? 'Update User' : 'Create User')}
              </SubmitButton>
            </FormFooter>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default UserForm;
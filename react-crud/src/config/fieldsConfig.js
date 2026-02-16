import * as Yup from 'yup';

const requiredString = (label) =>
  Yup.string()
    .transform((value) => value?.trim())   
    .strict(true)
    .required(`${label} is required`)
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must be less than 50 characters`)
    .matches(/^[A-Za-z\s]+$/, `${label} can only contain letters`);

const phoneValidation = Yup.string()
  .transform((value) => value?.trim())
  .required('Phone Number is required')
  .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number');

const emailValidation = Yup.string()
  .transform((value) => value?.trim().toLowerCase())
  .required('Email Address is required')
  .email('Enter a valid email address')
  .max(100, 'Email is too long');

export const userFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: requiredString('First Name'),
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: requiredString('Last Name'),
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    validation: phoneValidation,
  },
  {
    name: 'emailAddress',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: emailValidation,
  },
];

export const getValidationSchema = () => {
  const schema = userFields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {});

  return Yup.object().shape(schema);
};
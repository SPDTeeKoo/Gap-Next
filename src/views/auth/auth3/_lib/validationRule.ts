export const validationRules = {
    FirstName: {
      required: 'First name is required'
      // You can add more validation rules here
    },
    LastName: {
      required: 'Last name is required'
      // You can add more validation rules here
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address'
      }
    },
    Cname:{
      required: 'Company name is required'
      // You can add more validation rules here
    },
    Password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long'
      }
    },
    CPassword: {
      required: 'Confirm Password is required',
      validate: (value: any, { Password }: any) => value === Password || 'Passwords do not match'
    }
  };
  
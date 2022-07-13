import validation from 'validate.js';

const constraints = {
  email: {
    email: {
      message: 'Email is not valid.'
    }
  },
  address: {
    presence: {
      message: 'Address is not valid.'
    },
    length: {
      minimum: 2,
      maximum: 50,
      message: 'Address is not valid.'
    }
  },
  city: {
    presence: {
      message: 'City is not valid.'
    },
    length: {
      minimum: 2,
      maximum: 20,
      message: 'City is not valid.'
    }
  },
  country: {
    presence: {
      message: 'Country is not valid.'
    },
    length: {
      minimum: 2,
      maximum: 20,
      message: 'Country is not valid.'
    }
  },
  phoneNumber: {
    presence: {
      message: 'Phone is not valid.'
    },
    length: {
      minimum: 8,
      maximum: 15,
      message: 'Phone is not valid.'
    }
  },
  firstName: {
    presence: {
      message: 'Name is required.'
    },
    length: {
      minimum: 2,
      maximum: 20,
      message: 'Name is not valid.'
    },
    format: {
      pattern: /[^0-9]+/,
      flags: 'u',
      message: 'Name cannot contain number.'
    }
  },
  lastName: {
    presence: {
      message: 'Surname is required.'
    },
    format: {
      pattern: /[^0-9]+/,
      flags: 'u',
      message: 'Surname cannot contain number.'
    }
  },
  password: {
    presence: {
      message: 'Password is required.'
    },
    length: {
      minimum: 3,
      message: 'Password must be at least 3 characters.'
    }
  },
  termsAndConditions: {
    presence: {
      message: 'Accept terms and conditions is required.'
    },
    inclusion: {
      within: [true],
      message: 'Accept terms and conditions is required.'
    }
  }
};

export default function validate(value, constraintName) {
  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const constraint = constraints[constraintName];

  // For dev
  if (!constraint) {
    return 'Value cannot be validated';
  }

  const errors = validation.single(value, constraint);

  // If there is an error message, return it!
  if (errors) {
    // Return only the field errors message if there are multiple
    return errors[0];
  }

  return null;
}

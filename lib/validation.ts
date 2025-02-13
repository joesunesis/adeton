import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export interface ValidationError {
  field: string;
  message: string;
}

export const validatePhone = (phone: string): ValidationError | null => {
  try {
    if (!phone) return { field: 'phone', message: 'Phone number is required' };
    
    // Add '+' if not present
    const phoneWithPlus = phone.startsWith('+') ? phone : `+${phone}`;
    
    if (!isValidPhoneNumber(phoneWithPlus)) {
      return { field: 'phone', message: 'Invalid phone number format' };
    }

    return null;
  } catch (error) {
    return { field: 'phone', message: 'Invalid phone number' };
  }
};

export const formatPhone = (phone: string): string => {
  try {
    // Add '+' if not present
    const phoneWithPlus = phone.startsWith('+') ? phone : `+${phone}`;
    const parsed = parsePhoneNumber(phoneWithPlus);
    return parsed.format('E.164'); // Returns number in format +1234567890
  } catch (error) {
    return phone;
  }
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }

  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one special character' };
  }

  return null;
};

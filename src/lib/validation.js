// Simple validation helpers (lightweight alternative to Zod)

export function validateQuoteForm(formData) {
  const errors = {};

  // Required fields
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone || !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.startDate) {
    errors.startDate = 'Rental start date is required';
  }

  if (!formData.endDate) {
    errors.endDate = 'Rental end date is required';
  }

  // Date validation
  if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      errors.startDate = 'Start date must be today or in the future';
    }

    if (end < start) {
      errors.endDate = 'End date must be after start date';
    }
  }

  if (!formData.items || formData.items.trim().length === 0) {
    errors.items = 'Please specify items needed';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Ghana phone format: supports various formats
  const phoneRegex = /^(\+233|0)?[2-5]\d{8}$/;
  const cleaned = phone.replace(/[\s-()]/g, '');
  return cleaned.length >= 10 && phoneRegex.test(cleaned);
}

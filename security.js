/* Updated security.js */

const PROFANITY_AND_DUMMY_WORDS = [
  // Profanities & Abuse
  "abuse", "idiot", "stupid", "scam", "fraud", "cheat", "bastard", 
  "asshole", "bitch", "crap", "damn", "fucker", "whore", "slut",
  // Dummy / Placeholder / Test terms
  "test", "tester", "testing", "dummy", "fake", "sample", "demo", 
  "admin", "administrator", "asdf", "qwerty", "temp", "null", "undefined"
];

// 1. Detect if name or string contains placeholder / test keywords
function containsPlaceholderOrAbuse(str) {
  if (!str) return false;
  const clean = str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  return PROFANITY_AND_DUMMY_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(clean);
  });
}

// 2. Validate legitimate real-name structure
function isValidRealName(name) {
  if (!name || name.trim().length < 3) return false;
  // Must contain only letters, dots, and spaces (no numbers or symbols)
  const namePattern = /^[a-zA-Z\s\.]+$/;
  if (!namePattern.test(name.trim())) return false;
  // Prevent single-word gibberish like 'aaa' or 'xyz'
  if (/^(.)\1+$/.test(name.replace(/\s+/g, ''))) return false;
  return true;
}

// 3. Block fake / repeated phone numbers (e.g., 8888888888, 1234567890)
function isFakePhoneNumber(mobileStr) {
  const digits = String(mobileStr || '').replace(/\D/g, '');
  if (digits.length < 10) return true;

  // Extract last 10 digits
  const last10 = digits.slice(-10);

  // Check all identical digits (e.g. 8888888888, 0000000000)
  if (/^(\d)\1{9}$/.test(last10)) return true;

  // Check more than 6 identical consecutive digits (e.g. 9888888888)
  if (/(\d)\1{6,}/.test(last10)) return true;

  // Check simple ascending or descending sequences
  const sequential = ["0123456789", "1234567890", "9876543210", "8765432109"];
  if (sequential.includes(last10)) return true;

  // Enforce standard Indian mobile starting digits (6, 7, 8, 9) if 10-digit number
  if (last10.length === 10 && !/^[6-9]/.test(last10)) return true;

  return false;
}

// 4. Block placeholder emails (e.g., teacher@gmail.com, test@..., dummy@...)
function isPlaceholderEmail(email) {
  if (!email) return false;
  const lower = email.toLowerCase().trim();
  const dummyPrefixes = ["test@", "tester@", "dummy@", "fake@", "sample@", "teacher@", "student@", "admin@"];
  return dummyPrefixes.some(prefix => lower.startsWith(prefix));
}

// 5. Comprehensive validator
function validateRegistrationField(value, fieldType, fieldLabel) {
  const str = String(value || '').trim();

  if (!str) {
    return { valid: false, error: `${fieldLabel} is required.` };
  }

  if (fieldType === 'name') {
    if (!isValidRealName(str)) {
      return { valid: false, error: `Please enter a valid full name (letters only, min 3 characters).` };
    }
    if (containsPlaceholderOrAbuse(str)) {
      return { valid: false, error: `"${str}" contains disallowed or test placeholder words.` };
    }
  }

  if (fieldType === 'mobile') {
    if (isFakePhoneNumber(str)) {
      return { valid: false, error: `Please enter a valid 10-digit mobile number.` };
    }
  }

  if (fieldType === 'email') {
    if (isPlaceholderEmail(str)) {
      return { valid: false, error: `Generic placeholder emails (e.g., "${str}") are not permitted.` };
    }
  }

  if (fieldType === 'text') {
    if (containsPlaceholderOrAbuse(str)) {
      return { valid: false, error: `${fieldLabel} contains disallowed terms.` };
    }
  }

  return { valid: true };
}

window.ApexSecurity = {
  ...window.ApexSecurity,
  containsPlaceholderOrAbuse,
  isValidRealName,
  isFakePhoneNumber,
  isPlaceholderEmail,
  validateRegistrationField
};

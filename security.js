/* security.js - Central Input Sanitation & Moderation */

// 1. Comprehensive HTML Escape (Prevents Stored XSS)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;');
}

// 2. Strip HTML tags from plain input fields
function stripHtmlTags(input) {
  if (!input) return '';
  return String(input).replace(/<[^>]*>?/gm, '').trim();
}

// 3. Prohibit URLs in identity fields (names, locations, subjects)
function containsUrls(str) {
  if (!str) return false;
  const urlPattern = /(https?:\/\/|www\.|\.com|\.org|\.net|\.xyz|\.io|bit\.ly|t\.co)/i;
  return urlPattern.test(str);
}

// 4. Bad word and profanity detector
// Extend this list with regional terms or variations as needed
const PROFANITY_LIST = [
  "abuse", "idiot", "stupid", "scam", "fraud", "cheat", "bastard", 
  "asshole", "bitch", "crap", "damn", "fucker", "whore", "slut"
];

function checkMaliciousOrAbusiveWords(str) {
  if (!str) return false;

  // Normalize leetspeak substitutions: 0->o, 1->i, @->a, $->s, etc.
  const normalized = str
    .toLowerCase()
    .replace(/[@4]/g, 'a')
    .replace(/[1!|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[$5]/g, 's')
    .replace(/[3]/g, 'e')
    .replace(/[^a-z0-9\s]/g, ' '); // remove symbols to expose words

  // Check whole-word matches
  return PROFANITY_LIST.some(badWord => {
    const regex = new RegExp(`\\b${badWord}\\b`, 'i');
    return regex.test(normalized);
  });
}

// 5. Unified Form Field Validator
function validateUserTextField(value, fieldLabel, options = { allowUrls: false, maxLength: 500 }) {
  const clean = stripHtmlTags(value);

  if (!clean && options.required) {
    return { valid: false, error: `${fieldLabel} is required.` };
  }

  if (clean.length > options.maxLength) {
    return { valid: false, error: `${fieldLabel} cannot exceed ${options.maxLength} characters.` };
  }

  if (!options.allowUrls && containsUrls(clean)) {
    return { valid: false, error: `${fieldLabel} cannot contain web links or URLs.` };
  }

  if (checkMaliciousOrAbusiveWords(clean)) {
    return { valid: false, error: `${fieldLabel} contains disallowed or inappropriate language.` };
  }

  return { valid: true, sanitized: clean };
}

// Export to window scope so existing HTML scripts can access it immediately
window.ApexSecurity = {
  escapeHtml,
  stripHtmlTags,
  containsUrls,
  checkMaliciousOrAbusiveWords,
  validateUserTextField
};

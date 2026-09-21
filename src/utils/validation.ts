/**
 * Validates Indian standard mobile numbers:
 * 10 digits, typically beginning with 6, 7, 8, or 9
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  // Allows optional 91 or 0 prefix followed by 10 digits
  return /^(?:91|0)?[6-9]\d{9}$/.test(cleaned);
}

export function validateEmail(email: string): boolean {
  if (!email) return true; // Optional email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

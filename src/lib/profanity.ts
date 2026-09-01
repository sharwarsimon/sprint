// Basic profanity word list for friendly community chat
const BANNED_PATTERNS = [
  /\basshole\b/gi,
  /\bbitch\b/gi,
  /\bfuck\b/gi,
  /\bshit\b/gi,
  /\bcunt\b/gi,
  /\bdick\b/gi,
  /\bnigger\b/gi,
  /\bfaggot\b/gi,
  /\bwhore\b/gi,
  /\bslut\b/gi,
  /\bpiss\b/gi,
  /\bnazi\b/gi
];

/**
 * Checks if a string contains abusive language
 */
export function hasProfanity(text: string): boolean {
  if (!text) return false;
  return BANNED_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Masks profanity with asterisks for safe rendering
 */
export function maskProfanity(text: string): string {
  if (!text) return '';
  let sanitized = text;
  BANNED_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, match => '*'.repeat(match.length));
  });
  return sanitized;
}

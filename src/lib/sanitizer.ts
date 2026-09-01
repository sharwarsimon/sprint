import DOMPurify from 'dompurify';

/**
 * Sanitizes input text to prevent XSS attacks and HTML injections
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  // Strip any dangerous HTML tags and scripts
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Plain text only in chat
    ALLOWED_ATTR: []
  });
  return cleaned.trim();
}

/**
 * Validates text length and content rules
 */
export function validateMessageContent(text: string, maxLength: number = 500): { isValid: boolean; error?: string } {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Message cannot be empty.' };
  }
  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Message cannot exceed ${maxLength} characters.` };
  }
  return { isValid: true };
}

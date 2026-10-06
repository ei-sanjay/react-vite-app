export interface FeedbackValues {
  name: string;
  email: string;
  message: string;
}

export function validateFeedback(values: FeedbackValues) {
  const errors: Partial<Record<keyof FeedbackValues, string>> = {};
  if (!values.name || values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!values.email || !values.email.includes('@')) {
    errors.email = 'Enter a valid email';
  }
  if (!values.message || values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

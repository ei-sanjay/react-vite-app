import { useState, type FormEvent } from 'react';

import { UiButton } from '@/components/ui/UiButton';
import { validateFeedback, type FeedbackValues } from '@/lib/validation';
import { useCreateFeedbackMutation } from '@/store/postsApi';

const defaults: FeedbackValues = {
  name: '',
  email: '',
  message: '',
};

export function FeedbackForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [createFeedbackMutation] = useCreateFeedbackMutation();
  const createFeedback = async (values: FeedbackValues) => {
    await createFeedbackMutation(values).unwrap();
  };

  const [values, setValues] = useState<FeedbackValues>(defaults);
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateFeedback(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setIsSubmitting(true);
    try {
      await createFeedback(values);
      setStatus('Feedback submitted successfully (demo API).');
      setValues(defaults);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="panel">
      <header className="panel-header">
        <h2>Forms & validation</h2>
        <p>Native form controls</p>
      </header>
      <form className="feedback-form" onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Ada Lovelace"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            placeholder="ada@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Message
          <textarea
            rows={4}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            placeholder="What should we improve?"
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </label>
        <UiButton type="submit" disabled={isSubmitting} data-testid="feedback-submit">
          {isSubmitting ? 'Sending…' : 'Send feedback'}
        </UiButton>
      </form>
      {status && (
        <p className="success-text" aria-live="polite" data-testid="feedback-success">
          {status}
        </p>
      )}
      <p className="panel-note">
        <strong>When to use:</strong> simple forms without a dedicated form library.
        <br />
        <strong>Best practice:</strong> graduate to a form library once fields or validation grow.
      </p>
    </article>
  );
}

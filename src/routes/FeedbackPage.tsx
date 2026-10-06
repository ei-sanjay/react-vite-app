import { FeedbackForm } from '@/features/feedback/FeedbackForm';

export function FeedbackPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">Forms</p>
        <h1>Feedback</h1>
        <p className="lede">
          Submit demo feedback with <strong>None</strong>.
        </p>
      </header>
      <FeedbackForm />
    </div>
  );
}

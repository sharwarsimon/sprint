import React, { useState } from 'react';
import { X, Flag, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string | null;
  onSubmitReport: (messageId: string, reason: string) => Promise<{ success: boolean; error?: string }>;
}

const REPORT_REASONS = [
  'Harassment or bullying',
  'Hate speech or discrimination',
  'Spam or advertising scams',
  'Explicit or inappropriate content',
  'Revealing private personal info (Doxxing)',
  'Other violation'
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  messageId,
  onSubmitReport
}) => {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !messageId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageId) return;

    setIsSubmitting(true);
    setError(null);

    const fullReason = customNotes.trim() 
      ? `${selectedReason}: ${customNotes.trim()}`
      : selectedReason;

    const res = await onSubmitReport(messageId, fullReason);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } else {
      setError(res.error || 'Failed to submit report');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Report Submitted</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Thank you for keeping PulseChat safe. Our moderation system will review this message promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Report Message</h3>
                <p className="text-xs text-slate-400">Flag inappropriate or harmful messages to moderators</p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Select Reason
              </label>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition select-none ${
                      selectedReason === r
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r}
                      checked={selectedReason === r}
                      onChange={() => setSelectedReason(r)}
                      className="text-rose-600 bg-slate-800 border-slate-600"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="custom-notes" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Additional Context (Optional)
              </label>
              <textarea
                id="custom-notes"
                rows={2}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Provide details if relevant..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

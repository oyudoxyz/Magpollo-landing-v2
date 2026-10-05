import { toast } from 'sonner';
import { CONTACT } from '@/data/site';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (value: string) => EMAIL_PATTERN.test(value);

/** Inline error for an email field: nothing while empty, a nudge once it is wrong. */
export const emailError = (value: string) =>
  value.length > 0 && !isEmail(value) ? 'That address does not look right' : undefined;

/** The one failure message every form shows when the mail endpoint refuses. */
export const showSendError = (message?: string) =>
  toast.error('That did not send', {
    description: message || `Please try again, or write to ${CONTACT.email} and we will pick it up there.`,
  });

import React, { useState } from 'react';
import { toast } from 'sonner';
import { TextField, TextAreaField, SelectField } from '@/components/intake';
import sendMail, { IntakeDetail } from '@/utils/sendMail';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SimpleFormField {
  key: string;
  label: string;
  placeholder?: string;
  kind?: 'text' | 'email' | 'textarea' | 'select';
  options?: string[];
  required?: boolean;
  autoComplete?: string;
}

interface SimpleFormProps {
  /** Appears in the inbound email's subject line and first row. */
  purpose: string;
  fields: SimpleFormField[];
  submitLabel: string;
  /** Initial values, e.g. a preselected option from router state. */
  initial?: Record<string, string>;
  /** Rendered instead of the form once sent. */
  sent: React.ReactNode;
}

/**
 * A short single-step form in the intake language, routed through the same
 * mail endpoint as the intake. Used for the work-walkthrough request and
 * careers. Errors surface as a toast; success swaps in the `sent` node.
 */
export const SimpleForm: React.FC<SimpleFormProps> = ({ purpose, fields, submitLabel, initial = {}, sent }) => {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    fields.forEach((f) => (v[f.key] = initial[f.key] ?? ''));
    return v;
  });
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const email = values.email ?? '';
  const emailError = email.length > 0 && !EMAIL_PATTERN.test(email) ? 'That address does not look right' : undefined;
  const valid =
    fields.every((f) => !f.required || values[f.key].trim().length > 0) && (!('email' in values) || EMAIL_PATTERN.test(email));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setBusy(true);
    const details: IntakeDetail[] = [
      { label: 'Request', value: purpose },
      ...fields
        .filter((f) => !['name', 'email'].includes(f.key) && values[f.key].trim())
        .map((f) => ({ label: f.label, value: values[f.key] })),
    ];
    const result = await sendMail({
      name: values.name ?? '',
      email,
      company: values.company || undefined,
      message: details.map((d) => `${d.label}:\n${d.value}`).join('\n\n'),
      selectedServices: [{ id: 1, title: purpose }],
      details,
    });
    setBusy(false);
    if (result.success) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('That did not send', {
        description: result.message || 'Please try again, or write to salesteam@magpollo.com and we will pick it up there.',
      });
    }
  };

  if (done) return <>{sent}</>;

  return (
    <form onSubmit={submit} noValidate className="space-y-9">
      {fields.map((f) => {
        if (f.kind === 'textarea') {
          return (
            <TextAreaField
              key={f.key}
              label={f.label}
              value={values[f.key]}
              onChange={(v) => set(f.key, v)}
              placeholder={f.placeholder}
              required={f.required}
              disabled={busy}
              rows={4}
            />
          );
        }
        if (f.kind === 'select') {
          return (
            <SelectField
              key={f.key}
              label={f.label}
              options={f.options ?? []}
              value={values[f.key]}
              onChange={(v) => set(f.key, v)}
              disabled={busy}
            />
          );
        }
        return (
          <TextField
            key={f.key}
            type={f.kind === 'email' ? 'email' : 'text'}
            label={f.label}
            value={values[f.key]}
            onChange={(v) => set(f.key, v)}
            placeholder={f.placeholder}
            required={f.required}
            autoComplete={f.autoComplete}
            error={f.key === 'email' ? emailError : undefined}
            disabled={busy}
          />
        );
      })}

      <div className="border-t border-border pt-8">
        {showErrors && !valid && (
          <p className="mb-6 text-sm text-destructive">We need a name and a working email address.</p>
        )}
        <button type="submit" disabled={busy} className={`cta press ${!valid || busy ? 'opacity-40' : ''}`}>
          {busy ? 'Sending…' : submitLabel}
        </button>
      </div>
    </form>
  );
};

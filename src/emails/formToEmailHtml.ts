/**
 * The inbound-intake email, as a string template. Replaces the React Email
 * render so react-dom/server stays out of the browser bundle.
 */

interface Params {
  name: string;
  email: string;
  company?: string;
  message?: string;
  selectedServices: Array<{ id: number; title: string }>;
  details?: Array<{ label: string; value: string }>;
  files?: Array<{ name: string }>;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nl = (s: string) => esc(s).replace(/\n/g, '<br>');

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px 8px 0;font:600 11px/1.4 monospace;letter-spacing:.1em;text-transform:uppercase;color:#635D53;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:8px 0;font:15px/1.55 -apple-system,Segoe UI,sans-serif;color:#251F17">${nl(value)}</td></tr>`;

export function formToEmailHtml(p: Params): string {
  const rows = [
    row('Name', p.name),
    row('Email', p.email),
    p.company ? row('Firm', p.company) : '',
    ...(p.details?.length ? p.details.map((d) => row(d.label, d.value)) : p.message ? [row('Message', p.message)] : []),
    p.selectedServices.length && !p.details?.length ? row('Selected', p.selectedServices.map((s) => s.title).join('\n')) : '',
    p.files?.length ? row('Attachments', p.files.map((f) => f.name).join('\n')) : '',
  ].join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>New intake from ${esc(p.name)}</title></head>
<body style="margin:0;background:#DFD8CE;padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FAF8F5;border:1px solid #ACA69E">
<tr><td style="padding:24px 28px;border-bottom:1px solid #E5E0D8;font:600 11px/1.4 monospace;letter-spacing:.15em;text-transform:uppercase;color:#CE4257">Magpollo · new intake</td></tr>
<tr><td style="padding:16px 28px 24px"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${rows}</table></td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E5E0D8;font:12px/1.5 -apple-system,Segoe UI,sans-serif;color:#635D53">Sent from magpollo.com. Reply goes to ${esc(p.email)}.</td></tr>
</table></body></html>`;
}

/**
 * Site-wide copy and structure. Sourced from MAGPOLLO HQ (Notion): the Founding
 * Brief, Company One-Liner and Messaging, Starter Offer, Paid Blueprint, Care Plan,
 * Sales Playbook, Competitive Positioning and the Team Operating Policy.
 */

export const CONTACT = {
  email: 'salesteam@magpollo.com',
  phone: '+1 (470) 287-7285',
  phoneHref: 'tel:+14702877285',
  legalName: 'Magpollo Corp',
  social: [
    { label: 'X', href: 'https://x.com/MagpolloTech' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/magpollo' },
    { label: 'Instagram', href: 'https://www.instagram.com/magpollotech' },
    { label: 'Discord', href: 'https://discord.gg/4Qv8khbBf8' },
  ],
};

/** Header links, in order. Let's build leads. */
export const NAV = [
  { to: '/lets-build', label: "Let's build", primary: true },
];

/** The phone menu has room for more than the header: every page worth visiting. */
export const MOBILE_NAV = [
  ...NAV,
  { to: '/work', label: 'Proof of work' },
  { to: '/careers', label: 'Careers' },
];

/** The three things we sell, in the order a client meets them. No prices on the site. */
export const OFFERS = [
  { title: 'Workflow Diagnosis', body: 'In 1–2 weeks, we study one part of your business that’s held together by spreadsheets, inboxes and memory. You get a map of how the work happens today, what it’s costing you, and a clear recommendation, including “don’t build” if that’s the right answer. The fee is credited in full toward your build if you go ahead.' },
  { title: 'System Build', body: 'In 5 weeks, we design and launch one working system, built around how your team actually works and the tools worth keeping. Then 2 weeks of fixes and fine-tuning. Fixed scope, fixed price.' },
  { title: 'Support & Improvements', body: 'After launch, we keep your system healthy and keep making it better. Essentials covers monitoring, fixes, security updates and hosting oversight. Plus adds up to 6 hours of improvements each month.' },
];

/**
 * The two systems we can walk a client through, on request. `client` describes
 * the client without naming them; the name itself is never on the site.
 */
export const PROOF = [
  {
    id: 'prospecting-engine',
    title: 'Prospecting engine for field sales',
    summary: 'Sourcing, drafting, a human approval gate on every send, follow-up and reply triage.',
    client: 'Fortune 500 sales organisation',
  },
  {
    id: 'custom-commerce',
    title: 'Custom commerce system',
    summary: 'A 3D configurator that turns a customer’s choices into validated pricing, a checkout-ready order and a fulfilment record.',
    client: 'Made-to-order commerce business',
  },
];

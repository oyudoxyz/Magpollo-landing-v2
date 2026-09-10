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

export const NAV = [
  { to: '/systems', label: 'Systems' },
  { to: '/how-we-work', label: 'How we work' },
  { to: '/company', label: 'Company' },
];

export const ONE_LINER =
  'Magpollo builds focused software systems for firms that have outgrown spreadsheets and disconnected tools.';

/** The three things we sell, in the order a client meets them. */
export const OFFERS = [
  {
    index: '01',
    name: 'Blueprint',
    kicker: 'One to two weeks · $3,500',
    summary:
      'We map the workflow as it actually runs: who touches it, which tools, where it breaks and what it costs. You get a fixed scope and a recommendation, which may be not to build.',
    deliverables: [
      'Current-state workflow map',
      'Problem and consequence summary',
      'Tool and data map',
      'Build-versus-buy recommendation',
      'Fixed Sprint scope, timeline and exclusions',
    ],
    note: 'Credited in full toward the Sprint if you proceed.',
  },
  {
    index: '02',
    name: 'System Sprint',
    kicker: 'Five weeks to launch · fixed price',
    summary:
      'We design and ship the agreed system around your real workflow. Fixed scope, fixed price, one primary workflow, a clear definition of done. Two weeks of stabilization follow launch.',
    deliverables: [
      'One source of truth for the workflow',
      'Human approval enforced in code',
      'Integrations with the tools you keep',
      'Migration of one agreed dataset',
      'Training and a written handover',
    ],
    note: 'Quoted after the Blueprint. Paid 50 / 30 / 20 across kickoff, prototype and launch.',
  },
  {
    index: '03',
    name: 'Care Plan',
    kicker: 'Monthly · from $1,000',
    summary:
      'Hosted custom software needs an owner. We monitor the system and its scheduled jobs, fix defects, keep dependencies current and tune rules, with a monthly health review.',
    deliverables: [
      'System and scheduled-job monitoring',
      'Defect fixes and security updates',
      'Minor rule tuning within an allowance',
      'Monthly health, usage and cost review',
      'Larger requests become a scoped change',
    ],
    note: 'Starts after stabilization. Required for systems we host.',
  },
];

/** Five weeks to launch, from the Starter Offer. */
export const WEEKS = [
  { week: '01', name: 'Diagnose', we: 'Map the workflow, actors, data, risks and baseline metrics.', you: 'Approve the current-state map and the success measures.' },
  { week: '02', name: 'Specify', we: 'Define the data model, screens, rules, integrations and approval logic.', you: 'Approve the clickable workflow and the scope.' },
  { week: '03', name: 'Build core', we: 'Configure records, drafts, approvals, sequencing and the runtime.', you: 'Review representative records and messages.' },
  { week: '04', name: 'Integrate', we: 'Connect systems, migrate sample data, test exceptions and permissions.', you: 'Complete user acceptance testing.' },
  { week: '05', name: 'Launch', we: 'Production setup, training, documentation and the launch checklist.', you: 'Approve go-live.' },
  { week: '+2', name: 'Stabilize', we: 'Two weeks of monitoring, defect fixes and rule tuning.', you: 'Confirm the transition to the Care Plan.' },
];

/** How we are different, from Competitive Positioning. */
export const PRINCIPLES = [
  { title: 'Diagnosis before building', body: 'We do not quote a system we have not mapped. The Blueprint comes first, and it can end in a recommendation not to build.' },
  { title: 'One system, not scattered automations', body: 'We keep the tools that work and build the missing operating layer around them. You own the result.' },
  { title: 'Human approval, enforced in code', body: 'Nothing sends, posts or writes to your records without a named person approving it. The system records who approved what.' },
  { title: 'Your data, your environment', body: 'Local-first deployment is available. Client data does not have to leave the environment you control.' },
  { title: 'Fixed scope, fixed price', body: 'Five weeks to launch, a written definition of done, and a change order for anything outside it. No hourly meter.' },
  { title: 'Production, not demos', body: 'The core system runs daily inside a Fortune 500 environment under a compliance policy that forbids auto-sending. That is a different thing from a prototype.' },
];

/** Who we work with, from the Founding Brief. */
export const FIT = {
  yes: [
    'Owner-led, relationship-driven practices and firms',
    'Solo operators through teams of roughly fifty',
    'High-value client relationships, no internal product team',
    'Important work held together by spreadsheets, inboxes, documents and memory',
  ],
  focus: ['Real estate investment and advisory', 'specialized professional services'],
};

export const NOT = [
  'A generic AI automation agency',
  'An hourly development shop',
  'A SaaS reseller',
  'A strategy consultancy that hands over slides',
  'An unbounded custom development team',
];

/** Founding team and starting lanes, from the Team Operating Policy. */
export const TEAM = [
  { name: 'Charles Chukwuma Oyudo', lane: 'Company direction, sales, product, discovery, delivery coordination and operations' },
  { name: 'Haleem Bello', lane: 'Technology strategy, engineering, architecture, infrastructure and technical quality' },
  { name: 'Utieyin Ogedegbe', lane: 'Marketing, brand, audience development and acquisition' },
  { name: 'Malik Roufay', lane: 'Engineering, implementation, technical delivery and product support' },
];

/** The two systems we can walk a client through, on request. */
export const PROOF = [
  {
    id: 'prospecting-engine',
    title: 'Prospecting engine for field sales',
    summary:
      'Public-data sourcing, enrichment and scoring, voice-matched drafting, a human approval gate on every send, follow-up sequencing, reply triage and field-day tooling. In daily production inside a Fortune 500 environment.',
    tags: ['Client development', 'Approval gate', 'Local-first'],
  },
  {
    id: 'custom-commerce',
    title: 'Custom commerce system for a made-to-order business',
    summary:
      'A 3D configurator that turns a customer’s choices into validated pricing, a checkout-ready order and a fulfilment record the team can build from. Client identity withheld.',
    tags: ['Configuration', 'Pricing rules', 'Fulfilment'],
  },
];

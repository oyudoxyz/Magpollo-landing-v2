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

export const NAV = [{ to: '/company', label: 'Company' }];

/** The three things we sell, in the order a client meets them. No prices or timelines on the site. */
export const OFFERS = [
  { index: '01', name: 'Blueprint', summary: 'We map the workflow as it actually runs and give you a fixed scope. Sometimes the recommendation is not to build.' },
  { index: '02', name: 'Sprint', summary: 'We build the agreed system around your real workflow. One decision from you a week, a written definition of done.' },
  { index: '03', name: 'Care', summary: 'We keep it running: monitoring, fixes, updates, and a monthly look at whether it is still doing its job.' },
];

/** Founding team and starting lanes, from the Team Operating Policy. */
export const TEAM = [
  { name: 'Charles Chukwuma Oyudo', lane: 'Direction, sales, product' },
  { name: 'Haleem Bello', lane: 'Engineering, architecture' },
  { name: 'Utieyin Ogedegbe', lane: 'Marketing, brand' },
  { name: 'Malik Roufay', lane: 'Engineering, delivery' },
];

/** The two systems we can walk a client through, on request. */
export const PROOF = [
  {
    id: 'prospecting-engine',
    title: 'Prospecting engine for field sales',
    summary: 'Sourcing, drafting, a human approval gate on every send, follow-up and reply triage. In daily use inside a Fortune 500 sales organisation; reps spend more of the day selling.',
  },
  {
    id: 'custom-commerce',
    title: 'Custom commerce system',
    summary: 'A 3D configurator that turns a customer’s choices into validated pricing, a checkout-ready order and a fulfilment record. Client identity withheld.',
  },
];

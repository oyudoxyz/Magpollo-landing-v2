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

/** The three things we sell, in the order a client meets them. No prices or timelines on the site. */
export const OFFERS = [
  { title: 'Blueprint', body: 'We learn how the work really happens today and give you a fixed scope. Sometimes the honest answer is that you don’t need to build anything.' },
  { title: 'Sprint', body: 'We build the missing part around the tools you already use. You make one decision a week, and we agree in writing what “done” means.' },
  { title: 'Care', body: 'We keep it running: fixes, updates, and a monthly check that it’s still doing its job. Your team stays in charge wherever judgment matters.' },
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

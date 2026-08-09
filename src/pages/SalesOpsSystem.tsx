import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Maximize2, X } from 'lucide-react';

const techStack = [
  'NEXT.JS + TYPESCRIPT',
  'POSTGRESQL + PRISMA',
  'CLAUDE (HAIKU + SONNET)',
  'N8N',
  'APOLLO',
  'PERPLEXITY SONAR',
  'GOOGLE PLACES + MAPS',
  'GMAIL + SHEETS API',
  'APPLESCRIPT (IMESSAGE)',
  'TELEGRAM'
];

const buildPhases = [
  { phase: '0: Infrastructure', shipped: 'Hardened VPS, tunneled access, nightly backups, workflow runtime' },
  { phase: '1: Signal ingestion', shipped: '4 public-data feeds live + LLM article extraction' },
  { phase: '2: Enrichment + scoring', shipped: 'Validated on real merchants: processor detection off live sites, score floors, territory fence' },
  { phase: '3: Personalization + field kit', shipped: 'Voice-matched sequences, blitz generator, walkable clusters, one-pagers' },
  { phase: '4: Reply classification', shipped: 'LLM triage + suggested replies, never auto-sent' },
  { phase: '5: Booking + metrics', shipped: 'Meeting prep briefs, call-ahead reminders, weekly metrics digest' },
  { phase: '6: Command center UI', shipped: 'Signal feed, approval queue, reply queue, pipeline: the rep’s single pane' }
];

const toolchain = [
  { tool: 'n8n (self-hosted)', job: 'Cron scrapers for public data feeds', why: 'Visual workflows, runs off-machine, pennies per run' },
  { tool: 'Claude Haiku', job: 'Extraction, scoring, reply triage', why: 'Fast and cheap at high-volume structured tasks' },
  { tool: 'Claude Sonnet', job: 'Voice drafting', why: 'Quality where a merchant actually reads the output' },
  { tool: 'Apollo', job: 'Decision-maker + contact enrichment', why: 'Industry standard; fill-empty merging protects manual data' },
  { tool: 'Perplexity Sonar', job: 'AI website finder', why: 'Real-time web grounding, prompted to refuse guesses' },
  { tool: 'Google Places + Maps', job: 'Phones, geocoding, walkable routes', why: 'Primary enrichment for tiny SMBs Apollo can’t see' },
  { tool: 'Gmail API', job: 'Threaded sends + reply scanning', why: 'Replies land where the rep already works' },
  { tool: 'Google Sheets API', job: 'CRM mirror', why: 'Validation rules as a data contract' },
  { tool: 'AppleScript / iMessage', job: 'SMS sending', why: 'No A2P platform needed; human on the send button' },
  { tool: 'Telegram', job: 'Daily brief + debrief', why: 'Meets the rep where they actually are: their phone' },
  { tool: 'PostgreSQL + Prisma', job: 'Single source of truth', why: 'Every lead, touch, draft, reply, and wave in one schema' },
  { tool: 'Next.js', job: 'The command center', why: 'One UI for the whole lifecycle, local-only' }
];

const SalesOpsSystem: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  return (
    <Layout>
      {/* Printable Case Study Page Container */}
      <div className="gutter pb-24 pt-4 md:pt-8 print:p-0 print:m-0 print:w-full print:max-w-none">
        
        {/* Case Study Document Card */}
        <article className="relative bg-background text-foreground print:bg-white print:text-black">
          
          {/* Document Header Bar */}
          <header className="border-b border-border pb-6 print:border-black">
            <div className="flex items-center justify-between pb-2">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-mark">
                PROOF OF WORK
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground print:text-black/70">
                CASE STUDY · PRODUCT SYSTEMS
              </div>
            </div>

            {/* Lede Summary */}
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-foreground/90 font-sans print:text-black print:text-sm">
              A complete prospecting product built for field sales: public-data sourcing, AI enrichment and scoring, voice-matched drafting, an automated follow-up sequencer, reply triage, field-day tooling, and a daily accountability loop. A human approval gate on every send.
            </p>

            {/* Main Document Title */}
            <h1 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl print:text-3xl print:text-black print:mt-4">
              Sales Operation System: <br className="hidden sm:inline" />
              Built for Field Reps
            </h1>

            {/* Tech Stack Pills / Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5 print:mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border/80 bg-card px-2.5 py-1 text-[10px] font-mono font-medium text-foreground/80 tracking-wider uppercase print:border-black/30 print:bg-gray-100 print:text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Section 1: The Problem */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              The problem: why field reps miss quota
            </h2>
            
            <p className="text-base leading-relaxed text-foreground/90 mb-6 print:text-sm print:text-black">
              The company's tools cover everything after a deal starts moving: CRM, call recording, commissions. Everything before that — the actual filling of the pipeline — is the rep's problem.
            </p>

            <ul className="space-y-3 pl-1 text-base text-foreground/90 print:text-sm print:text-black">
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>They don't know where to source small businesses.</strong> The best SMB lead lists are free and public: business-license feeds, food permits, liquor-board issuances, local-news openings. But they're raw, ALL-CAPS, and contactless.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>The lists they do get are uncontactable.</strong> Recycled CRM exports carry dead numbers and no decision-maker.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Follow-up dies after one touch.</strong> Without a system tracking who is due, the rep's memory is the cadence. It loses.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Product questions bottleneck on managers.</strong> Pricing models, hardware fit by vertical, underwriting rules — every question a rep can't self-serve is a delay or an escalation.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Outreach is inconsistent, and automation is a compliance risk.</strong> Enterprise sales orgs forbid auto-sending for good reasons. This engine was designed around that rule.
                </div>
              </li>
            </ul>

            <p className="mt-6 text-base font-medium text-foreground print:text-sm print:text-black">
              We built the answer as one product: a prospecting operating system that runs entirely on the rep's own machine.
            </p>
          </section>

          {/* Section 2: Product at a Glance */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The product at a glance
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              Four interlocking layers: a clickable command center, an autonomous engine, a field kit, and cloud workers feeding it data.
            </p>

            <figure className="my-6 overflow-hidden border border-border bg-card p-2 print:border-black/30 print:bg-white">
              <img
                src="/work/prospecting-engine-product-map.svg"
                alt="Product Map showing Command Center, Engine, Field Kit, and Cloud Workers"
                className="w-full h-auto object-contain"
                loading="eager"
              />
              <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground print:text-black/70">
                The whole product. Everything below is live and in daily use.
              </figcaption>
            </figure>
          </section>

          {/* Section 3: The Command Center */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The command center
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              A local web app, ten screens, one job: answer "what do I do right now?"
            </p>

            <div className="space-y-6 text-base leading-relaxed text-foreground/90 print:text-sm print:text-black">
              <div>
                <p>
                  <strong>Home</strong> opens to quota meters (weekly meetings, monthly revenue pace), a unified nudge feed (stale leads, overdue follow-ups, meeting prep with call-ahead times, quota gaps), and an engine heartbeat chip that pulses green when the background loop is healthy.
                </p>
                
                {/* Screenshot 1: Command Center Home (High Quality Retina) */}
                <figure className="my-6 group relative overflow-hidden border border-border bg-card shadow-sm transition-all hover:border-foreground/40 print:border-black/30 print:my-4">
                  <div className="relative">
                    <img
                      src="/work/prospecting-engine-dashboard.png"
                      alt="Magpollo Command Center Home Screen showing Quota Pace, Nudge Feed, and Follow-up Blitz Actions"
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => setActiveImage({
                        src: '/work/prospecting-engine-dashboard.png',
                        alt: 'Command Center Dashboard',
                        title: 'Command Center Home Dashboard: Quota meters, unified nudge feed, SMS follow-up blitz triggers, and background engine heartbeat.'
                      })}
                    />
                    <button
                      onClick={() => setActiveImage({
                        src: '/work/prospecting-engine-dashboard.png',
                        alt: 'Command Center Dashboard',
                        title: 'Command Center Home Dashboard: Quota meters, unified nudge feed, SMS follow-up blitz triggers, and background engine heartbeat.'
                      })}
                      className="absolute top-3 right-3 rounded bg-background/80 p-2 text-foreground backdrop-blur opacity-0 transition-opacity group-hover:opacity-100 print:hidden"
                      title="Enlarge image"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                  <figcaption className="border-t border-border/60 bg-muted/30 px-4 py-2.5 text-xs font-mono text-muted-foreground flex justify-between items-center print:border-black/20 print:bg-gray-50 print:text-black/70">
                    <span>Command Center Interface — Home screen with quota meters, real-time nudges, and blitz triggers</span>
                    <span className="text-[10px] uppercase text-muted-foreground print:hidden">Click to enlarge</span>
                  </figcaption>
                </figure>
              </div>

              <p>
                <strong>Signals</strong> is the sourcing floor: every business pulled from the public-data feeds, scored and filtered for contactability. One click on <strong>Work this</strong> converts a signal into a pipeline lead and queues a voice-matched draft. One click on <strong>Enrich</strong> runs the on-demand enrichment waterfall.
              </p>

              <p>
                <strong>Outreach</strong> is the heart of the product, four stages in one console. <strong>Review:</strong> every AI draft waits for edit, approve, or reject. <strong>Ready:</strong> approved drafts launch as a wave. <strong>In flight:</strong> every active sequence member with its current touch, next send time, and a per-lead stop button. <strong>Replies:</strong> inbound email, already classified (positive, question, objection, unsubscribe), each with a suggested response.
              </p>

              <p>
                <strong>Pipeline</strong> is a kanban board over the full lead lifecycle, and each lead opens into a workspace: every field editable, full interaction history, touch logging, meeting outcome capture, and an <strong>AI actions panel</strong> that runs on the lead's complete history.
              </p>

              <p>
                <strong>Win-back</strong> imports a former-client book and fires a re-engagement blitz with relationship-forward copy, tracked through the same wave machinery as cold outreach.
              </p>

              <div>
                <p>
                  <strong>Chat</strong> is a product-trained sales brain with a built-in prompt library that encodes the sales methodology. <strong>Knowledge</strong> feeds it: upload product sheets and call scripts as PDFs and they are chunked and indexed for the AI to reference.
                </p>

                {/* Screenshot 2: Chat & Knowledge Brain (High Quality Retina) */}
                <figure className="my-6 group relative overflow-hidden border border-border bg-card shadow-sm transition-all hover:border-foreground/40 print:border-black/30 print:my-4">
                  <div className="relative">
                    <img
                      src="/work/prospecting-engine-chat.png"
                      alt="Magpollo AI Sales Brain Chat Console showing Prompt Library, Model Selector, and PDF Knowledge Ingestion"
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => setActiveImage({
                        src: '/work/prospecting-engine-chat.png',
                        alt: 'Sales Brain Chat Console',
                        title: 'Sales Brain Chat Console: Product methodology prompt library, PDF doc upload & knowledge indexing, and multi-model AI routing.'
                      })}
                    />
                    <button
                      onClick={() => setActiveImage({
                        src: '/work/prospecting-engine-chat.png',
                        alt: 'Sales Brain Chat Console',
                        title: 'Sales Brain Chat Console: Product methodology prompt library, PDF doc upload & knowledge indexing, and multi-model AI routing.'
                      })}
                      className="absolute top-3 right-3 rounded bg-background/80 p-2 text-foreground backdrop-blur opacity-0 transition-opacity group-hover:opacity-100 print:hidden"
                      title="Enlarge image"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                  <figcaption className="border-t border-border/60 bg-muted/30 px-4 py-2.5 text-xs font-mono text-muted-foreground flex justify-between items-center print:border-black/20 print:bg-gray-50 print:text-black/70">
                    <span>Sales Brain Chat Console — Prompt library categories, document grounding, and objection handling</span>
                    <span className="text-[10px] uppercase text-muted-foreground print:hidden">Click to enlarge</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Section 4: The Lead Lifecycle */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The lead lifecycle
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              Every lead moves through the same six stages, and stage five is the point:
            </p>

            <figure className="my-6 overflow-hidden border border-border bg-card p-2 print:border-black/30 print:bg-white">
              <img
                src="/work/prospecting-engine-flow.svg"
                alt="Lead Lifecycle Flow Diagram: Source, Score, Enrich, Draft, Approve (Human Gate), Send + Follow up"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground print:text-black/70">
                The lifecycle. The approval gate is enforced in code, not in habit.
              </figcaption>
            </figure>

            <div className="space-y-4 text-base leading-relaxed text-foreground/90 mt-6 print:text-sm print:text-black">
              <p>
                <strong>Source.</strong> Four public-data feeds run on cron: business licenses, county food permits (straight off the government's ArcGIS endpoint), liquor-board issuance PDFs, and LLM article extraction from local business news. Cost per run: $0 to $0.05.
              </p>
              <p>
                <strong>Score.</strong> Claude Haiku extracts, dedupes, and scores each business 0 to 100 against the ideal customer profile, geo-fenced by a 72-ZIP territory table, with hard-kills for government entities, non-profits, and multi-location chains.
              </p>
              <p>
                <strong>Enrich, on demand only.</strong> An Enrich button, never a batch job. An AI website finder locates the merchant's real domain, then Apollo resolves the decision-maker and contact data. The highest-value signal costs nothing: website fingerprinting reads the merchant's current payment processor straight off the live checkout page.
              </p>
              <p>
                <strong>Draft.</strong> Claude Sonnet writes email and SMS in the rep's voice, grounded in a playbook of real sent texts. Guardrails run twice, in the prompt and again in post-processing.
              </p>
              <p className="bg-card border-l-2 border-mark p-3 print:bg-gray-100 print:border-black">
                <strong>Approve. The human gate. Nothing auto-sends, ever.</strong> This is the compliance requirement turned into architecture.
              </p>
              <p>
                <strong>Send and follow up.</strong> Email sends threaded through the Gmail API. Touches 2 and 3 fire on day 3 and day 9. A reply on any channel stops the sequence instantly.
              </p>
            </div>
          </section>

          {/* Section 5: The Field Kit */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The field kit
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              Field sales is half desk, half street. The product covers the street half:
            </p>

            <ul className="space-y-3 pl-1 text-base text-foreground/90 print:text-sm print:text-black">
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Walkable clusters.</strong> Every geocoded business joins a proximity cluster, the walk order is computed nearest-neighbor, and each cluster exports as a Google Maps route.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>One-pager builder.</strong> The AI authors persuasive copy from pasted research; the renderer locks it into a fixed letter-portrait brand framework.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>SMS blitz scripts.</strong> Approved text batches compile into a one-click script, grouped by vertical.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Call-ahead discipline.</strong> Every booked meeting automatically gets two reminders: a call the day before and a call one hour before.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 6: The Engine Behind It */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              The engine behind it
            </h2>

            <figure className="my-6 overflow-hidden border border-border bg-card p-2 print:border-black/30 print:bg-white">
              <img
                src="/work/prospecting-engine-architecture.svg"
                alt="Local-First Engine Architecture Diagram"
                className="w-full h-auto object-contain"
              />
              <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground print:text-black/70">
                Everything canonical lives on the rep's machine. The employer CRM is reachable only by a human.
              </figcaption>
            </figure>

            <div className="space-y-4 text-base leading-relaxed text-foreground/90 print:text-sm print:text-black">
              <p>
                A local loop ticks every 3 minutes: drains the job queue, generates queued drafts, scans Gmail for replies every 15 minutes and classifies them, advances due follow-ups, geocodes new businesses and rebuilds the walk clusters, and mirrors the database to the review sheet daily.
              </p>
              <p>
                The same engine runs the accountability loop: a 7am brief with the day's plan, and a randomized evening debrief over Telegram. The rep answers in plain language; an LLM parses the reply and writes the day's outcomes back into the database.
              </p>
            </div>
          </section>

          {/* Section 7: How It Was Built (Table) */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              How it was built
            </h2>

            <div className="overflow-x-auto border border-border print:border-black/40">
              <table className="w-full text-left text-xs font-mono print:text-[11px]">
                <thead>
                  <tr className="border-b border-border bg-muted/50 uppercase text-muted-foreground print:border-black/30 print:bg-gray-100 print:text-black">
                    <th className="px-4 py-3 font-semibold w-1/3">Phase</th>
                    <th className="px-4 py-3 font-semibold w-2/3">Shipped</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-black/20">
                  {buildPhases.map((row) => (
                    <tr key={row.phase} className="hover:bg-muted/20">
                      <td className="px-4 py-3 font-semibold text-foreground print:text-black">{row.phase}</td>
                      <td className="px-4 py-3 text-foreground/90 font-sans print:text-black">{row.shipped}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Toolchain (Table) */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              The toolchain, and why each piece
            </h2>

            <div className="overflow-x-auto border border-border print:border-black/40">
              <table className="w-full text-left text-xs font-mono print:text-[10px]">
                <thead>
                  <tr className="border-b border-border bg-muted/50 uppercase text-muted-foreground print:border-black/30 print:bg-gray-100 print:text-black">
                    <th className="px-3 py-2.5 font-semibold w-1/4">Tool</th>
                    <th className="px-3 py-2.5 font-semibold w-1/3">Job</th>
                    <th className="px-3 py-2.5 font-semibold w-5/12">Why this one</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-black/20">
                  {toolchain.map((row) => (
                    <tr key={row.tool} className="hover:bg-muted/20">
                      <td className="px-3 py-2.5 font-semibold text-foreground print:text-black">{row.tool}</td>
                      <td className="px-3 py-2.5 text-foreground/90 font-sans print:text-black">{row.job}</td>
                      <td className="px-3 py-2.5 text-muted-foreground font-sans print:text-black/80">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 9: Proven Under Load */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-3 text-foreground print:text-xl print:text-black">
              Proven under load
            </h2>

            <p className="text-base text-foreground/90 mb-6 print:text-sm print:text-black">
              The system runs in production daily, and production found defects that the build process caught, fixed, and locked in as invariants:
            </p>

            <ul className="space-y-4 pl-1 text-base leading-relaxed text-foreground/90 print:text-sm print:text-black">
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Every send creates its follow-up schedule atomically.</strong> An early send path fired touch 1 without enrolling leads in the sequencer. The fix made enrollment part of the send itself.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Cadence pacing is a product spec, not a config value.</strong> Follow-ups briefly ran on day 1 and 2 instead of the playbook's day 3 and 9. Caught by auditing in-flight state.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Structured signals beat prompt prose, but only if the prose agrees.</strong> The scorer received a correct in-territory flag yet still disqualified valid leads. The most transferable AI-engineering lesson in the build.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Integration surfaces are contracts.</strong> Spreadsheet dates written as strings broke dashboard formulas. Fixed by treating the mirror as a typed, mapped contract.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Silent failures got boundary validation.</strong> PDF knowledge ingestion and LLM model routing both failed quietly. Both now validate at the boundary and fail loudly.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 10: Why It Matters */}
          <section className="pt-10 print:pt-6 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              Why it matters
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-foreground/90 print:text-sm print:text-black">
              <p>
                For a sales team, this is the point: the engine is <strong>the system your best rep carries in their head, made executable</strong>. Where the leads come from. When to follow up. What to say. What the product answer is. All of it enforced by software instead of discipline, so the underperformer inherits the operating system of the top performer.
              </p>
              <p>
                And it deploys inside enterprise constraints because the constraints were designed in, not fought: a human gate on every send, a manual-only CRM path, metered enrichment, guardrailed generation. Compliance here is not a policy document. It is the architecture.
              </p>
            </div>
          </section>

          {/* Document Footer Bar */}
          <footer className="mt-12 border-t border-border pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground print:mt-8 print:border-black print:text-black/70">
            <span>Product Systems</span>
            <span>magpollo.com</span>
          </footer>

        </article>
      </div>

      {/* Screenshot Lightbox Modal (Web Only) */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm print:hidden"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-none border border-border bg-background p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs font-mono">
              <span className="truncate pr-4 text-foreground font-semibold">{activeImage.alt}</span>
              <button
                onClick={() => setActiveImage(null)}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto p-2">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="border-t border-border bg-muted/20 px-4 py-3 text-xs font-sans text-muted-foreground">
              {activeImage.title}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SalesOpsSystem;

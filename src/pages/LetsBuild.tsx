import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import {
  ChoiceRows,
  SelectField,
  TextField,
  TextAreaField,
  FileDrop,
} from "@/components/intake";
import { CtaLink, CtaButton } from "@/components/editorial";
import sendMail from "@/utils/sendMail";
import { EASE } from "@/lib/motion";
import { emailError as emailErrorFor, isEmail, showSendError } from "@/lib/forms";
import { SYMPTOMS } from "@/data/symptoms";
import { useMeta } from "@/hooks/use-meta";
import { PAGES } from "@/seo";

/* ---- Question data -------------------------------------------------------- */

const BUSINESS_TYPES = [
  "Real estate investment or advisory",
  "Professional services",
  "Healthcare or clinical practice",
  "Trades or field services",
  "Something else",
];

const TIMING = [
  "In the next 30 days",
  "This quarter",
  "Next quarter",
  "Just exploring",
];

interface Answers {
  symptoms: string[];
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType: string;
  timing: string;
  story: string;
  tools: string;
}

const EMPTY: Answers = {
  symptoms: [],
  name: "",
  business: "",
  email: "",
  phone: "",
  businessType: "",
  timing: "",
  story: "",
  tools: "",
};

const STEPS = [
  {
    title: "What sounds familiar?",
    helper:
      "Tick as many as you like. You don't need to know what to build. That part is our job.",
  },
  {
    title: "Where should we reply?",
    helper: "A real person reads this and writes back within one business day.",
  },
] as const;

/* ---- Chrome --------------------------------------------------------------- */

const Progress: React.FC<{ step: number }> = ({ step }) => (
  <div className="mb-14">
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <span className="eyebrow text-foreground">
        {String(step + 1).padStart(2, "0")}{" "}
        <span className="text-muted-foreground">
          / {String(STEPS.length).padStart(2, "0")}
        </span>
      </span>
      <span className="eyebrow">{STEPS[step].title}</span>
    </div>
    <div className="h-px w-full bg-border">
      <motion.div
        className="h-px bg-foreground"
        initial={false}
        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </div>
  </div>
);

/**
 * Heading on the left, questions on the right — the same two-column rhythm the
 * rest of the site uses. The left column stays put while the questions scroll,
 * so the step never loses its title or the answers it is building on.
 */
const StepShell: React.FC<{
  step: number;
  aside?: React.ReactNode;
  children: React.ReactNode;
}> = ({ step, aside, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } }}
    exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: EASE } }}
    className="editorial-grid"
  >
    <div className="lg:sticky lg:top-28 lg:self-start">
      <h1 className="headline mb-4">{STEPS[step].title}</h1>
      <p className="max-w-[360px] text-base text-muted-foreground">
        {STEPS[step].helper}
      </p>
      {aside}
    </div>
    <div>{children}</div>
  </motion.div>
);

/* ---- Success -------------------------------------------------------------- */

const SentScreen: React.FC<{ name: string }> = ({ name }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: EASE }}
    className="editorial-grid"
  >
    <div>
      <p className="eyebrow mb-6">Received</p>
      <h1 className="display">
        That is all we <span className="accented">need</span> for now.
      </h1>
    </div>

    <div className="lg:pt-6">
      <p className="subhead mb-8 max-w-[440px]">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We read these ourselves
        rather than routing them into a queue. Expect a reply within one
        business day, usually with a question or two about the part that
        costs you the most time.
      </p>

      <ul className="rule-list mb-10">
        {[
          "We read it and look for what is really slowing the work down",
          "We come back with the smallest thing worth building first, and what it would cost",
          "If you do not need custom software, we will tell you that instead",
        ].map((item, i) => (
          <li key={item}>
            <span className="text-muted-foreground">{item}</span>
            <span className="list-index">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ul>

      <CtaLink to="/">Back to the site</CtaLink>
    </div>
  </motion.div>
);

/* ---- Page ----------------------------------------------------------------- */

interface LetsBuildLocationState {
  symptoms?: string[];
}

const LetsBuild: React.FC = () => {
  useMeta(PAGES.letsBuild);
  const location = useLocation();
  const preselected =
    (location.state as LetsBuildLocationState | null)?.symptoms ?? [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => ({
    ...EMPTY,
    symptoms: preselected.filter((s) => SYMPTOMS.includes(s)),
  }));
  const [files, setFiles] = useState<File[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  // Reads from the previous state rather than the render closure, so several
  // toggles landing in the same tick do not overwrite one another.
  const toggleSymptom = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(value)
        ? prev.symptoms.filter((v) => v !== value)
        : [...prev.symptoms, value],
    }));
  };

  const emailError = emailErrorFor(answers.email);

  // Only a name and a working email are required.
  const stepIsValid = useMemo(() => {
    if (step === 0) return answers.symptoms.length > 0;
    return answers.name.trim().length > 0 && isEmail(answers.email);
  }, [step, answers]);

  const missingMessage = [
    "Tick at least one so we know where to start.",
    "We need a name and a working email address to reply.",
  ][step];

  const goTo = (next: number) => {
    setShowErrors(false);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (!stepIsValid) {
      setShowErrors(true);
      return;
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepIsValid) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    // Everything the visitor answered, in reading order, for the inbound email.
    const details = [
      { label: "What sounds familiar", value: answers.symptoms.join("\n") },
      { label: "Description", value: answers.story },
      { label: "Tools already in use", value: answers.tools },
      { label: "Phone", value: answers.phone },
      { label: "Kind of business", value: answers.businessType },
      { label: "Timing", value: answers.timing },
    ].filter((d) => d.value.trim().length > 0);

    const result = await sendMail({
      name: answers.name,
      email: answers.email,
      company: answers.business || undefined,
      message: details.map((d) => `${d.label}:\n${d.value}`).join("\n\n"),
      // Kept as `selectedServices` so the existing mail endpoint keeps working.
      selectedServices: answers.symptoms.map((title, i) => ({
        id: i + 1,
        title,
      })),
      details,
      files: files.length ? files : undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showSendError(result.message);
    }
  };

  return (
    <Layout>
      <div className="gutter py-16 md:py-24">
        {isSent ? (
          <SentScreen name={answers.name} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Progress step={step} />

            {/* initial={false}: the first step is already on the page when it loads. */}
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 ? (
                <StepShell key="step-0" step={0}>
                  <ChoiceRows
                    name="What sounds familiar?"
                    options={SYMPTOMS}
                    selected={answers.symptoms}
                    onToggle={toggleSymptom}
                  />
                </StepShell>
              ) : (
                <StepShell key="step-1" step={1}>
                  {/* Required: two fields, one row on wider screens. */}
                  <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                    <TextField
                      required
                      label="Name"
                      value={answers.name}
                      onChange={(v) => set("name", v)}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={isSubmitting}
                    />
                    <TextField
                      required
                      type="email"
                      label="Email"
                      value={answers.email}
                      onChange={(v) => set("email", v)}
                      placeholder="you@yourbusiness.com"
                      autoComplete="email"
                      error={emailError}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Optional detail: a quiet text control with the same + as the footer's
                      contact toggle. The fields' underlines are the only lines on the page. */}
                  <button
                    type="button"
                    onClick={() => setShowMore((v) => !v)}
                    aria-expanded={showMore}
                    aria-controls="intake-more"
                    className={`meta-link press mt-10 inline-flex items-center gap-3 ${showMore ? "reveal-open" : ""}`}
                  >
                    <span className="reveal-plus" aria-hidden="true" />
                    {showMore ? "Less detail" : "Add more detail"}
                  </button>

                  <AnimatePresence initial={false}>
                    {showMore && (
                      <motion.div
                        id="intake-more"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: EASE } }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-x-8 gap-y-9 pt-10 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <TextAreaField
                              label="Description"
                              value={answers.story}
                              onChange={(v) => set("story", v)}
                              placeholder="A few lines in your own words…"
                              rows={3}
                              disabled={isSubmitting}
                            />
                          </div>
                          <TextField
                            label="Business name"
                            value={answers.business}
                            onChange={(v) => set("business", v)}
                            placeholder="Company or practice"
                            autoComplete="organization"
                            disabled={isSubmitting}
                          />
                          <TextField
                            type="tel"
                            label="Phone"
                            value={answers.phone}
                            onChange={(v) => set("phone", v)}
                            placeholder="If you would rather talk"
                            autoComplete="tel"
                            disabled={isSubmitting}
                          />
                          <SelectField
                            label="Kind of business"
                            options={BUSINESS_TYPES}
                            value={answers.businessType}
                            onChange={(v) => set("businessType", v)}
                            disabled={isSubmitting}
                          />
                          <SelectField
                            label="When you want it working"
                            options={TIMING}
                            value={answers.timing}
                            onChange={(v) => set("timing", v)}
                            disabled={isSubmitting}
                          />
                          <div className="sm:col-span-2">
                            <TextField
                              label="Tools you already use"
                              value={answers.tools}
                              onChange={(v) => set("tools", v)}
                              placeholder="For example Gmail, a CRM, Excel"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <FileDrop
                              files={files}
                              setFiles={setFiles}
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StepShell>
              )}
            </AnimatePresence>

            {/* Controls. No rule above: the last row or field already draws one. */}
            <div className="mt-14">
              {showErrors && !stepIsValid && (
                <p className="mb-6 text-sm text-destructive">
                  {missingMessage}
                </p>
              )}

              <div className="flex items-center justify-between gap-6">
                {step > 0 ? (
                  <CtaButton muted onClick={() => goTo(step - 1)} disabled={isSubmitting}>
                    Back
                  </CtaButton>
                ) : (
                  <CtaLink to="/" muted>
                    Cancel
                  </CtaLink>
                )}

                {/* Distinct keys: otherwise React reuses the node mid-click and Continue also submits.
                    Until the step is valid the label is muted; pressing it says what is missing. */}
                {step < STEPS.length - 1 ? (
                  <CtaButton key="continue" waiting={!stepIsValid} onClick={goNext}>
                    Continue
                  </CtaButton>
                ) : (
                  <CtaButton key="send" type="submit" waiting={!stepIsValid} disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Send it"}
                  </CtaButton>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default LetsBuild;

import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import {
  ChoiceRows,
  SelectField,
  MultiSelectField,
  TextField,
  TextAreaField,
  FileDrop,
} from "@/components/intake";
import { useToast } from "@/components/ui/use-toast";
import sendMail from "@/utils/sendMail";
import { SYMPTOMS } from "@/data/symptoms";

/* ---- Question data -------------------------------------------------------- */

const BUSINESS_TYPES = [
  "Real estate investment or advisory",
  "Professional services",
  "Healthcare or clinical practice",
  "Trades or field services",
  "Something else",
];

const TEAM_SIZES = ["Solo", "2–20", "20+"];

const WORK_LIVES_IN = [
  "Spreadsheets",
  "An email inbox",
  "A CRM",
  "Paper and PDFs",
  "Someone's memory",
  "A tool we had built",
];

const TIMING = [
  "In the next 30 days",
  "This quarter",
  "Next quarter",
  "Just exploring",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Answers {
  symptoms: string[];
  name: string;
  business: string;
  email: string;
  phone: string;
  role: string;
  businessType: string;
  teamSize: string;
  workLivesIn: string[];
  timing: string;
  notes: string;
}

const EMPTY: Answers = {
  symptoms: [],
  name: "",
  business: "",
  email: "",
  phone: "",
  role: "",
  businessType: "",
  teamSize: "",
  workLivesIn: [],
  timing: "",
  notes: "",
};

const STEPS = [
  {
    title: "Choose what applies",
    helper: "Pick everything that sounds familiar.",
  },
  {
    title: "A little context",
    helper:
      "Where to send our reply, and anything that helps us read it properly.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

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
        transition={{ duration: 0.4, ease }}
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
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease }}
    className="editorial-grid"
  >
    <div className="lg:sticky lg:top-28 lg:self-start">
      <h1 className="section-head mb-4">{STEPS[step].title}</h1>
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
    transition={{ duration: 0.5, ease }}
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
        business day — usually with a question or two about the part that
        sounded most expensive.
      </p>

      <ul className="rule-list mb-10">
        {[
          "We read it and look for the workflow underneath the symptoms",
          "We come back with what we would build first, and what it would cost",
          "If it is not a fit, we will tell you that instead",
        ].map((item, i) => (
          <li key={item}>
            <span className="text-muted-foreground">{item}</span>
            <span className="list-index">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ul>

      <Link to="/" className="cta">
        Back to the site
      </Link>
    </div>
  </motion.div>
);

/* ---- Page ----------------------------------------------------------------- */

interface LetsBuildLocationState {
  symptoms?: string[];
}

const LetsBuild: React.FC = () => {
  const { toast } = useToast();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  // Reads from the previous state rather than the render closure, so several
  // toggles landing in the same tick do not overwrite one another.
  const toggle = (key: "symptoms" | "workLivesIn", value: string) => {
    setAnswers((prev) => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const emailError =
    answers.email.length > 0 && !EMAIL_PATTERN.test(answers.email)
      ? "That address does not look right"
      : undefined;

  // Only a name and a working email are required.
  const stepIsValid = useMemo(() => {
    if (step === 0) return answers.symptoms.length > 0;
    return answers.name.trim().length > 0 && EMAIL_PATTERN.test(answers.email);
  }, [step, answers]);

  const missingMessage = [
    "Pick at least one before continuing.",
    "We need a name and a working email address.",
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
      { label: "Where it breaks", value: answers.symptoms.join("\n") },
      { label: "Role", value: answers.role },
      { label: "Phone", value: answers.phone },
      { label: "Kind of business", value: answers.businessType },
      { label: "How many people", value: answers.teamSize },
      { label: "Work lives in", value: answers.workLivesIn.join(", ") },
      { label: "Timing", value: answers.timing },
      { label: "Anything else", value: answers.notes },
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
      toast({
        title: "That did not send",
        description:
          result.message ||
          "Please try again, or write to salesteam@magpollo.com and we will pick it up there.",
        variant: "destructive",
      });
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

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <StepShell key="step-0" step={0}>
                  <ChoiceRows
                    name="Where does it break?"
                    options={SYMPTOMS}
                    selected={answers.symptoms}
                    onToggle={(v) => toggle("symptoms", v)}
                  />
                </StepShell>
              ) : (
                <StepShell key="step-1" step={1}>
                  <div className="space-y-9">
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
                      label="Business name"
                      value={answers.business}
                      onChange={(v) => set("business", v)}
                      placeholder="Company or practice name"
                      autoComplete="organization"
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
                    <TextField
                      type="tel"
                      label="Phone"
                      value={answers.phone}
                      onChange={(v) => set("phone", v)}
                      placeholder="If you would rather talk"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                    <TextField
                      label="Role"
                      value={answers.role}
                      onChange={(v) => set("role", v)}
                      placeholder="Owner, partner, operations lead"
                      autoComplete="organization-title"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-9 space-y-9">
                    <SelectField
                      label="What kind of business is it?"
                      options={BUSINESS_TYPES}
                      value={answers.businessType}
                      onChange={(v) => set("businessType", v)}
                      disabled={isSubmitting}
                    />
                    <SelectField
                      label="How many people?"
                      options={TEAM_SIZES}
                      value={answers.teamSize}
                      onChange={(v) => set("teamSize", v)}
                      disabled={isSubmitting}
                    />
                    <MultiSelectField
                      label="Where does the work live today?"
                      options={WORK_LIVES_IN}
                      selected={answers.workLivesIn}
                      onToggle={(v) => toggle("workLivesIn", v)}
                      disabled={isSubmitting}
                    />
                    <SelectField
                      label="When would you want this working?"
                      options={TIMING}
                      value={answers.timing}
                      onChange={(v) => set("timing", v)}
                      disabled={isSubmitting}
                    />
                    <TextAreaField
                      label="Anything else we should read first?"
                      value={answers.notes}
                      onChange={(v) => set("notes", v)}
                      placeholder="The part that costs you the most time, in your own words."
                      rows={4}
                      disabled={isSubmitting}
                    />
                    <FileDrop
                      files={files}
                      setFiles={setFiles}
                      disabled={isSubmitting}
                    />
                  </div>
                </StepShell>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-16 border-t border-border pt-8">
              {showErrors && !stepIsValid && (
                <p className="mb-6 text-sm text-destructive">
                  {missingMessage}
                </p>
              )}

              <div className="flex items-center justify-between gap-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="cta cta-muted"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                ) : (
                  <Link to="/" className="cta cta-muted">
                    Cancel
                  </Link>
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className={`cta ${!stepIsValid ? "opacity-40" : ""}`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cta ${!stepIsValid || isSubmitting ? "opacity-40" : ""}`}
                  >
                    {isSubmitting ? "Sending…" : "Send it"}
                  </button>
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

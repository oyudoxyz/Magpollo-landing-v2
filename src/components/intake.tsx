import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * Form primitives for the intake flow, in the same editorial language as the
 * rest of the site: hairline rules, square markers, underlined controls and no
 * rounded corners.
 */

const underline =
  'w-full border-b border-border bg-transparent py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none disabled:opacity-50';

const Chevron: React.FC<{ open?: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 10 6"
    className={`pointer-events-none absolute right-0 top-1/2 h-[6px] w-[10px] -translate-y-1/2 stroke-muted-foreground transition-transform duration-200 ${
      open ? 'rotate-180' : ''
    }`}
    fill="none"
    strokeWidth="1.25"
  >
    <path d="M1 1l4 4 4-4" />
  </svg>
);

/** Shared label row: name on the left, "optional" flag on the right of it. */
const FieldLabel: React.FC<{
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  as?: 'label' | 'span';
}> = ({ htmlFor, required, children, as = 'label' }) => {
  const Tag = as;
  return (
    <Tag htmlFor={htmlFor} className="eyebrow mb-1 block">
      {children}
      {!required && <span className="ml-2 normal-case tracking-normal opacity-60">optional</span>}
    </Tag>
  );
};

/* ---- Rule-separated choice rows ------------------------------------------ */

interface ChoiceRowsProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  name: string;
}

/** Full-width rows separated by hairlines, with a square marker on the right. */
export const ChoiceRows: React.FC<ChoiceRowsProps> = ({ options, selected, onToggle, name }) => (
  <div role="group" aria-label={name}>
    {options.map((option) => {
      const isSelected = selected.includes(option);
      return (
        <button
          key={option}
          type="button"
          role="checkbox"
          aria-checked={isSelected}
          aria-label={option}
          onClick={() => onToggle(option)}
          className={`flex w-full items-center justify-between gap-6 border-b border-border py-4 text-left text-base leading-snug transition-colors duration-200 first:border-t ${
            isSelected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>{option}</span>
          <span
            aria-hidden="true"
            className={`h-3 w-3 shrink-0 border transition-colors duration-200 ${
              isSelected ? 'border-foreground bg-foreground' : 'border-muted-foreground/60'
            }`}
          />
        </button>
      );
    })}
  </div>
);

/* ---- Text fields ---------------------------------------------------------- */

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const TextField: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  disabled,
  autoComplete,
}) => {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`${underline} ${error ? 'border-destructive' : ''}`}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export const TextAreaField: React.FC<Omit<FieldProps, 'type'> & { rows?: number }> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  disabled,
}) => {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`${underline} resize-none`}
      />
    </div>
  );
};

/* ---- Dropdowns ------------------------------------------------------------ */

interface DropdownProps {
  label: string;
  options: string[];
  /** Always an array. Single-choice dropdowns hold at most one value. */
  selected: string[];
  onSelect: (value: string) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * One dropdown for every question on the page. Native selects hand the option
 * list to the OS, which drops a stock iOS/Android picker into the middle of an
 * otherwise typeset page — so the list is drawn here instead, in the same
 * hairline-and-square language as the rest of the form.
 *
 * Keyboard: arrows and Home/End move, Enter or Space picks, Escape closes and
 * returns focus to the trigger.
 */
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
  multiple = false,
  placeholder,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const openAt = () => {
    const firstSelected = options.findIndex((o) => selected.includes(o));
    setActiveIndex(firstSelected >= 0 ? firstSelected : 0);
    setOpen(true);
  };

  // Close when the pointer goes elsewhere on the page.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  // Keep DOM focus on the active option so screen readers follow along.
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const pick = (option: string) => {
    onSelect(option);
    if (!multiple) close();
  };

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openAt();
    }
  };

  const fallback = placeholder ?? (multiple ? 'Choose any' : 'Choose one');
  const summary = multiple
    ? selected.length === 0
      ? fallback
      : selected.length <= 2
        ? selected.join(', ')
        : `${selected.length} selected`
    : selected[0] || fallback;

  return (
    <div ref={wrapper}>
      <FieldLabel as="span">{label}</FieldLabel>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => (open ? close(false) : openAt())}
          onKeyDown={onTriggerKeyDown}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`${underline} flex cursor-pointer items-center pr-8 text-left ${
            selected.length ? 'text-foreground' : 'text-muted-foreground/60'
          }`}
        >
          <span className="truncate">{summary}</span>
        </button>
        <Chevron open={open} />

        {open && (
          <div
            role="listbox"
            aria-multiselectable={multiple || undefined}
            aria-label={label}
            onKeyDown={onPanelKeyDown}
            className="absolute left-0 right-0 top-full z-20 max-h-64 overflow-y-auto border border-border bg-card shadow-sm"
          >
            {options.map((option, i) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  ref={(el) => (optionRefs.current[i] = el)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={i === activeIndex ? 0 : -1}
                  onClick={() => pick(option)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition-colors duration-150 focus:outline-none ${
                    i === activeIndex ? 'bg-secondary' : ''
                  } ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  <span>{option}</span>
                  <span
                    aria-hidden="true"
                    className={`h-[10px] w-[10px] shrink-0 border transition-colors duration-150 ${
                      isSelected ? 'border-foreground bg-foreground' : 'border-muted-foreground/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/** Single choice. Picking a value closes the list. */
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <Dropdown
    label={label}
    options={options}
    selected={value ? [value] : []}
    // Picking the current value again clears it, so a choice is never a trap.
    onSelect={(option) => onChange(option === value ? '' : option)}
    placeholder={placeholder}
    disabled={disabled}
  />
);

interface MultiSelectFieldProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/** Several answers behind one line. The list stays open while picking. */
export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  selected,
  onToggle,
  placeholder,
  disabled,
}) => (
  <Dropdown
    multiple
    label={label}
    options={options}
    selected={selected}
    onSelect={onToggle}
    placeholder={placeholder}
    disabled={disabled}
  />
);

/* ---- Attachments ---------------------------------------------------------- */

interface FileDropProps {
  files: File[];
  setFiles: (files: File[]) => void;
  disabled?: boolean;
}

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;

export const FileDrop: React.FC<FileDropProps> = ({ files, setFiles, disabled }) => {
  const [isOver, setIsOver] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The serverless handler accepts at most 5 files of 10MB each.
  const accept = (incoming: File[]) => {
    const tooBig = incoming.filter((f) => f.size > MAX_BYTES);
    const withinSize = incoming.filter((f) => f.size <= MAX_BYTES);
    const room = MAX_FILES - files.length;
    const accepted = withinSize.slice(0, Math.max(room, 0));

    const problems: string[] = [];
    if (tooBig.length) problems.push(`${tooBig.length} file(s) over 10MB were skipped`);
    if (withinSize.length > accepted.length) problems.push(`up to ${MAX_FILES} files`);
    setNotice(problems.length ? problems.join(' · ') : null);

    if (accepted.length) setFiles([...files, ...accepted]);
  };

  return (
    <div>
      <FieldLabel as="span">Attachments</FieldLabel>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          if (!disabled) accept(Array.from(e.dataTransfer.files));
        }}
        className={`mt-2 border border-dashed px-6 py-8 text-center transition-colors duration-200 ${
          isOver ? 'border-foreground' : 'border-border'
        }`}
      >
        <p className="text-sm text-muted-foreground">
          Drop a screenshot, spreadsheet or document here, or{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            browse
          </button>
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Up to {MAX_FILES} files, 10MB each.
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            accept(Array.from(e.target.files || []));
            e.target.value = '';
          }}
        />
      </div>

      {notice && <p className="mt-2 text-xs text-destructive">{notice}</p>}

      {files.length > 0 && (
        <ul className="mt-4">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-4 border-b border-border py-3 first:border-t"
            >
              <span className="truncate text-sm text-muted-foreground">{file.name}</span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                className="meta-link shrink-0 hover:text-foreground"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

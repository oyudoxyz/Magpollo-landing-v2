import React, { useState } from 'react';
import { Section, CtaLink } from './editorial';
import { ChoiceRows } from './intake';
import { SYMPTOMS } from '@/data/symptoms';

const SoundFamiliar: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Section id="problem" heading="Sound familiar?">
      <ChoiceRows
        name="Sound familiar?"
        options={SYMPTOMS}
        selected={selected}
        onToggle={toggle}
      />

      <p className="mb-6 mt-10 max-w-[380px] text-base text-muted-foreground">
        Tick any that sound like your week. They carry over to the next step, so you only say it once.
      </p>

      <CtaLink to="/lets-build" state={{ symptoms: selected }}>
        Tell us more
      </CtaLink>
    </Section>
  );
};

export default SoundFamiliar;

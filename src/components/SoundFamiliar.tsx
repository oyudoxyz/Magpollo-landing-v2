import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './editorial';
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
        If any of those sound familiar, let's build.
      </p>

      <Link to="/lets-build" state={{ symptoms: selected }} className="cta">
        Start here
      </Link>
    </Section>
  );
};

export default SoundFamiliar;

import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import RetroComputer from '@/components/RetroComputer';
import SoundFamiliar from '@/components/SoundFamiliar';

const Index: React.FC = () => (
  <Layout>
    <Hero />
    <section className="gutter pb-24 md:pb-32">
      <RetroComputer />
    </section>
    <SoundFamiliar />
  </Layout>
);

export default Index;

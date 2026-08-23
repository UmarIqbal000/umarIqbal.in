import React from 'react';
import YashPreloader from './components/pro/YashPreloader';
import YashNav from './components/pro/YashNav';
import YashHero from './components/pro/YashHero';
import YashShowcase from './components/pro/YashShowcase';
import YashProjects from './components/pro/YashProjects';
import YashAbout from './components/pro/YashAbout';
import YashExperience from './components/pro/YashExperience';
import YashContact from './components/pro/YashContact';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2ee] flex flex-col font-sans selection:bg-[#00D4FF]/20 selection:text-[#00D4FF] relative overflow-x-hidden">
      
      {/* 00 // PRELOADER SCREEN */}
      <YashPreloader />

      {/* 01 // TOP MINIMALIST NAV */}
      <YashNav />

      {/* MAIN YASH CHAUHAN NARRATIVE SUITE */}
      <main className="flex-1 w-full flex flex-col">
        {/* 01 // HERO SECTION */}
        <YashHero />

        {/* 02 // DUAL COUNTER-SCROLLING CERTIFICATES SHOWCASE */}
        <YashShowcase />

        {/* 03 // STICKY STACKED FEATURED PROJECTS */}
        <YashProjects />

        {/* 04 // NARRATIVE ABOUT, SKILLS & WORK PROCESS */}
        <YashAbout />

        {/* 05 // DRIFTING HIGHLIGHTS CAROUSEL & TIMELINE */}
        <YashExperience />
      </main>

      {/* 06 // CREAM TOP-ROUNDED CONTACT FOOTER */}
      <YashContact />

    </div>
  );
}

export default App;
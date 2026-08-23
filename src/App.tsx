import React from 'react';
import YashPreloader from './components/pro/YashPreloader';
import YashNav from './components/pro/YashNav';
import YashHero from './components/pro/YashHero';
import YashShowcase from './components/pro/YashShowcase';
import YashProjects from './components/pro/YashProjects';
import YashAbout from './components/pro/YashAbout';
import YashHowIWork from './components/pro/YashHowIWork';
import YashSkills from './components/pro/YashSkills';
import YashJourney from './components/pro/YashJourney';
import YashHighlights from './components/pro/YashHighlights';
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
        {/* HERO SECTION */}
        <YashHero />

        {/* 01 // VERIFIED INDUSTRY CREDENTIALS SHOWCASE */}
        <YashShowcase />

        {/* 02 // FEATURED PRODUCTIONS & VENTURES */}
        <YashProjects />

        {/* 03 // ABOUT ME */}
        <YashAbout />

        {/* 04 // HOW I WORK */}
        <YashHowIWork />

        {/* 05 // LANGUAGES, FRONT & BACKEND TOOLS */}
        <YashSkills />

        {/* 06 // MY JOURNEY (EXPERIENCE & EMBEDDED LINKEDIN POSTS) */}
        <YashJourney />

        {/* 07 // HIGHLIGHTS & MILESTONES CAROUSEL */}
        <YashHighlights />
      </main>

      {/* 08 // CREAM TOP-ROUNDED CONTACT FOOTER */}
      <YashContact />

    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { siteConfig } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { BoltIcon } from './YashIcons';
import { Github, Linkedin, Globe, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

export const YashContact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${siteConfig.email}?subject=Project Inquiry from ${form.name}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-[#f3f3ee] px-6 pb-8 pt-20 text-[#111] md:px-12 md:pt-28"
    >
      {/* Floating Shape */}
      <span className="pointer-events-none absolute right-[6%] top-[8%] block w-12 md:w-16 animate-float-gentle opacity-80">
        <BoltIcon className="h-auto w-full drop-shadow-[0_10px_24px_rgba(168,85,247,0.3)]" />
      </span>

      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-10">
        {/* Left Column: Headline & Direct Contact Details */}
        <div>
          <h2 className="text-[14vw] md:text-[6.5vw] font-black font-heading leading-[0.92] uppercase text-black">
            Let's <br />
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] to-[#a855f7]">
              Touch
            </span>
          </h2>

          <FadeUp delay={0.2} className="mt-8 space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-lg md:text-2xl font-bold font-mono text-black hover:text-brand-violet transition-colors block"
            >
              {siteConfig.email}
            </a>
            <p className="text-sm font-mono text-black/60">
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-black transition-colors">
                {siteConfig.phone}
              </a>
              {' · '}
              {siteConfig.location}
            </p>
          </FadeUp>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-8">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black text-white hover:bg-brand-violet transition-all"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black text-white hover:bg-brand-violet transition-all"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={siteConfig.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black text-white hover:bg-brand-violet transition-all"
              title="LeetCode"
            >
              <SiLeetcode size={18} />
            </a>
            <a
              href={siteConfig.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black text-white hover:bg-brand-violet transition-all"
              title="Website"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <FadeUp delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6 md:pt-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 mb-1">
                YOUR NAME *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="What's your name?"
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm font-sans text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Where can I reach you?"
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm font-sans text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 mb-1">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Your contact number (optional)"
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm font-sans text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 mb-1">
                YOUR MESSAGE *
              </label>
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, idea, or inquiry..."
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm font-sans text-black outline-none transition-colors placeholder:text-black/30 focus:border-black resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold font-mono uppercase tracking-[0.2em] text-white bg-black hover:bg-brand-violet transition-all shadow-lg active:scale-95"
            >
              {submitted ? (
                <>
                  <span>Opening Mail Client</span>
                  <Check size={14} />
                </>
              ) : (
                <>
                  <span>Send Transmission</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </FadeUp>
      </div>

      {/* Footer Copyright */}
      <div className="mt-20 border-t border-black/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black/50 max-w-6xl mx-auto">
        <span>© 2026 UMAR IQBAL · ALL RIGHTS RESERVED</span>
        <span className="text-black font-semibold">CRAFTED WITH PRECISION & PASSION</span>
      </div>
    </footer>
  );
};

export default YashContact;

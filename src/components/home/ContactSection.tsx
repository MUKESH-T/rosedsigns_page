import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Download } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: "I'm interested in Website Design & Development.",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please share what you have in mind.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Create client brief text for download
    const briefContent = `=========================================
ROSEDSIGNS ATELIER — PROJECT COMMISSION BRIEF
=========================================
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Client Name: ${formData.name}
Official Email: ${formData.email}

PROJECT VISION & SCOPE:
${formData.message}

Atelier Liaison: Paris Vendôme / Worldwide
Direct Concierge: concierge@rosedsigns.com
=========================================`;

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RoseDsigns_Brief_${formData.name.replace(/\s+/g, '_') || 'Client'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative bg-[#171514] text-[#F7F3EC] overflow-hidden bg-grain-dark select-none"
    >
      {/* Soft Radial Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#A76570]/18 via-[#D9B1AE]/10 to-[#B08A57]/10 rounded-full filter blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header (Exact layout from reference image) */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#B08A57] font-sans font-medium mb-4">
            Your Next Chapter
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-light text-[#F7F3EC] tracking-tight leading-[1.08] mb-4 text-balance">
            Let's make<br />
            something <span className="italic font-normal text-[#C49B66]">bloom</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#E8E2D8]/80 font-sans leading-relaxed font-light max-w-xl mx-auto">
            Tell us a little about your brand and where you'd like to take it.
          </p>
        </div>

        {/* Minimalist Form Matching Reference Image */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 text-center flex flex-col items-center bg-[#1F1C1B]/80 border border-[#B08A57]/30 rounded-sm p-8"
            >
              <div className="w-14 h-14 rounded-full bg-[#A76570]/20 border border-[#B08A57] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#D9B1AE]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-light text-[#F7F3EC] mb-2">
                Project Brief Generated & Received
              </h3>
              <p className="text-sm text-[#E8E2D8]/80 font-sans max-w-md mx-auto leading-relaxed mb-6 font-light">
                Thank you, <span className="text-[#C49B66] font-medium">{formData.name}</span>. Your brief has been downloaded and dispatched to our founding partners.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', message: "I'm interested in Website Design & Development." });
                }}
                className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#C49B66] border border-[#C49B66]/40 hover:border-[#C49B66] rounded-sm transition-colors cursor-pointer"
              >
                Create Another Brief
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleCreateBrief} noValidate className="space-y-10 sm:space-y-12">
              {/* Row 1: Name and Email with Clean Underline Border */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-sans tracking-wide text-[#E8E2D8]/90 mb-2"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-[#E8E2D8]/25 hover:border-[#E8E2D8]/50 focus:border-[#C49B66] text-sm sm:text-base text-[#F7F3EC] placeholder-[#E8E2D8]/35 pb-2.5 focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-sans tracking-wide text-[#E8E2D8]/90 mb-2"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-transparent border-b border-[#E8E2D8]/25 hover:border-[#E8E2D8]/50 focus:border-[#C49B66] text-sm sm:text-base text-[#F7F3EC] placeholder-[#E8E2D8]/35 pb-2.5 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: What do you have in mind? with Clean Underline Border */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-sans tracking-wide text-[#E8E2D8]/90 mb-2"
                >
                  What do you have in mind?
                </label>
                <textarea
                  id="message"
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I'm interested in Website Design & Development."
                  className="w-full bg-transparent border-b border-[#E8E2D8]/25 hover:border-[#E8E2D8]/50 focus:border-[#C49B66] text-sm sm:text-base text-[#F7F3EC] placeholder-[#E8E2D8]/35 pb-2.5 focus:outline-none transition-colors resize-none leading-relaxed"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Bottom Action Row: Solid Gold Button on Left + Helper Text on Right */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#C49B66] hover:bg-[#B08A57] text-[#171514] font-sans font-medium text-xs sm:text-sm tracking-wide rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Generating brief...</span>
                  ) : (
                    <>
                      <span>Create project brief</span>
                      <ArrowUpRight className="w-4 h-4 text-[#171514]" />
                    </>
                  )}
                </button>

                <div className="text-xs sm:text-sm text-[#E8E2D8]/75 font-sans leading-relaxed max-w-sm font-light">
                  Download your brief to share with the RoseDsigns team.
                </div>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;

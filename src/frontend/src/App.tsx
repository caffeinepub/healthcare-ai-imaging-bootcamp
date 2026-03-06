import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  FlaskConical,
  GraduationCap,
  Heart,
  Laptop,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Plus,
  Shield,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import { useRequestBrochure, useSubmitLead } from "./hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalType = "apply" | "brochure" | null;

// ─── Lead Capture Form ────────────────────────────────────────────────────────

function LeadCaptureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [background, setBackground] = useState("");
  const [success, setSuccess] = useState(false);
  const submitLead = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !background) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitLead.mutateAsync({ name, email, phone, background });
      setSuccess(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setBackground("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md bg-white border border-gray-200 text-gray-900"
        data-ocid="lead_form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 display-font">
            Apply for the Bootcamp
          </DialogTitle>
          <p className="text-gray-500 text-sm">
            Limited to 10 seats per batch. Secure your spot today.
          </p>
        </DialogHeader>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
            data-ocid="lead_form.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-500 text-sm">
              Our team will contact you within 24 hours for the next steps.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-brand-red hover:bg-brand-red/90 text-white"
            >
              Close
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm">Full Name</Label>
              <Input
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-red"
                data-ocid="lead_form.input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm">Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-red"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm">Phone Number</Label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-red"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm">Your Background</Label>
              <Select value={background} onValueChange={setBackground}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:ring-brand-red focus:border-brand-red">
                  <SelectValue placeholder="Select your background" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem
                    value="Engineering Student"
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    Engineering Student
                  </SelectItem>
                  <SelectItem
                    value="Radiographer"
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    Radiographer / Imaging Technologist
                  </SelectItem>
                  <SelectItem
                    value="Medical Technology Student"
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    Medical Technology Student
                  </SelectItem>
                  <SelectItem
                    value="CS Graduate"
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    CS / BCA Graduate
                  </SelectItem>
                  <SelectItem
                    value="Doctor/Resident"
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    Doctor / Resident
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={submitLead.isPending}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3 text-base"
              data-ocid="lead_form.submit_button"
            >
              {submitLead.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Brochure Download Modal ──────────────────────────────────────────────────

function BrochureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const requestBrochure = useRequestBrochure();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await requestBrochure.mutateAsync({ email });
      setSuccess(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setEmail("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-sm bg-white border border-gray-200 text-gray-900"
        data-ocid="brochure.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 display-font">
            Download Brochure
          </DialogTitle>
          <p className="text-gray-500 text-sm">
            Enter your email and we'll send the complete program brochure.
          </p>
        </DialogHeader>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Brochure Sent!
            </h3>
            <p className="text-gray-500 text-sm">Check your inbox shortly.</p>
            <Button
              onClick={handleClose}
              className="mt-5 bg-brand-red hover:bg-brand-red/90 text-white"
            >
              Close
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm">Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-red"
                data-ocid="brochure.input"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={requestBrochure.isPending}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold"
              data-ocid="brochure.submit_button"
            >
              {requestBrochure.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Me the Brochure"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Program", href: "#program" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Careers", href: "#careers" },
  { label: "Bootcamp Experience", href: "#bootcamp" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#program" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-brand-red rounded-md flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-gray-900 font-bold text-xl display-font tracking-tight">
            Med<span className="text-brand-red">AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-all"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onApply}
            className="hidden sm:flex bg-brand-red hover:bg-brand-red/90 text-white font-semibold px-5 rounded-full glow-red-sm"
            data-ocid="nav.primary_button"
          >
            Apply Now
          </Button>
          <button
            type="button"
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 py-3 px-4 text-base rounded-lg hover:bg-gray-100 transition-all"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    onApply();
                  }}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-semibold rounded-full"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HERO_PILLS = [
  "6 Months Bootcamp",
  "40% Theory | 60% Practical",
  "Live Industry Projects",
  "Industry Demo Day",
  "Pre-Placement Opportunity",
];

function HeroSection({
  onApply,
  onBrochure,
}: {
  onApply: () => void;
  onBrochure: () => void;
}) {
  return (
    <section
      id="program"
      className="relative min-h-screen bg-white overflow-hidden flex items-center pt-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(218,27,54,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(218,27,54,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.52 0.22 22)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "oklch(0.52 0.22 22)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red border border-brand-red/30 bg-brand-red/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                India's First
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-gray-600 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-full">
                AI Healthcare Bootcamp
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight display-font">
              India's First{" "}
              <span className="text-brand-red">Integrated AI</span> in
              Healthcare Imaging Bootcamp
            </h1>

            <p className="text-xl font-semibold text-gray-700 tracking-wide uppercase text-sm">
              Clinical + AI + Simulation Program
            </p>

            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              A 6-month industry-integrated program designed to train engineers,
              radiographers, and medical professionals in AI-powered medical
              imaging and healthcare simulation technologies.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {HERO_PILLS.map((pill, pillIdx) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + pillIdx * 0.08 }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  {pill}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={onApply}
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-8 rounded-full glow-red text-base"
                data-ocid="hero.primary_button"
              >
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={onBrochure}
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-full text-base bg-transparent"
                data-ocid="hero.secondary_button"
              >
                Download Brochure
              </Button>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/generated/hero-ai-imaging.dim_900x700.jpg"
                alt="AI Healthcare Imaging Visualization"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.52 0.22 22), transparent 60%)",
                }}
              />
            </div>
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-brand-red display-font">
                6
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Month Program
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 bg-white border border-gray-200 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-brand-red display-font">
                10
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Seats Per Batch
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Earn While You Learn ─────────────────────────────────────────────────────

const STAT_CARDS = [
  { label: "Duration", value: "6 Months Bootcamp", icon: Clock },
  { label: "Structure", value: "40% Theory | 60% Practical", icon: BarChart3 },
  {
    label: "Outcome",
    value: "Live Projects + Industry Demo Day",
    icon: Target,
  },
  { label: "Location", value: "Noida, UP", icon: MapPin },
];

function EarnSection() {
  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 display-font tracking-tight">
            Earn While You Learn
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Get rewarded for performance while building industry-grade AI
            skills.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((card, statIdx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: statIdx * 0.1 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 transition-all duration-300 hover:shadow-red-glow-sm"
            >
              <card.icon className="w-6 h-6 text-brand-red mb-3" />
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">
                {card.label}
              </div>
              <div className="text-gray-900 font-bold text-sm leading-snug">
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-brand-red/40 bg-brand-red/8 p-8"
          style={{ boxShadow: "0 0 40px oklch(0.52 0.22 22 / 15%)" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-16 text-center">
            {[
              { label: "Cashback Stipend", icon: TrendingUp },
              { label: "Performance Rewards", icon: Zap },
              { label: "Pre-Placement Offer", icon: Shield },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand-red" />
                </div>
                <span className="text-gray-900 font-bold text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Who Should Apply ─────────────────────────────────────────────────────────

const AUDIENCE_CARDS = [
  {
    icon: GraduationCap,
    title: "Engineering Students",
    desc: "CSE / ECE / Biomedical / IT",
  },
  {
    icon: Activity,
    title: "Radiographers & Imaging Technologists",
    desc: "Professionals in diagnostic imaging",
  },
  {
    icon: FlaskConical,
    title: "BSc / MSc Medical Technology",
    desc: "Medical technology students",
  },
  {
    icon: Laptop,
    title: "BCA / CS Graduates",
    desc: "Computer science graduates",
  },
  {
    icon: Stethoscope,
    title: "Doctors & Residents",
    desc: "Physicians interested in AI-driven healthcare",
  },
];

function WhoShouldApply() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="bg-brand-red/10 text-brand-red border-brand-red/20 mb-4 text-xs font-semibold px-3 py-1">
            Target Audience
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 display-font tracking-tight">
            Who Should Apply?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AUDIENCE_CARDS.map((card, audIdx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: audIdx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:border-brand-red/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-brand-red/8 flex items-center justify-center mx-auto mb-4 transition-colors border border-gray-100 group-hover:border-brand-red/20">
                <card.icon className="w-7 h-7 text-gray-500 group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
                {card.title}
              </h3>
              <p className="text-gray-500 text-xs">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why This Program ─────────────────────────────────────────────────────────

const PROGRAM_ITEMS = [
  { icon: Layers, text: "Clinical Imaging (X-Ray, CT, MRI, Ultrasound)" },
  { icon: Brain, text: "AI Model Development" },
  { icon: Target, text: "Annotation Science" },
  { icon: Network, text: "Teleradiology Workflows" },
  { icon: Cpu, text: "3D / 4D Visualization" },
  { icon: Activity, text: "AI in Healthcare Simulation" },
  { icon: Zap, text: "Generative AI Systems" },
  { icon: Shield, text: "Agentic AI Workflows" },
  { icon: BarChart3, text: "Deployment & MLOps" },
];

function WhyDifferent() {
  return (
    <section id="program" className="bg-gray-100 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-brand-red/15 text-brand-red border-brand-red/25 mb-5 text-xs font-semibold px-3 py-1">
              Program Differentiator
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 display-font tracking-tight leading-tight mb-4">
              Not Just an AI Course —{" "}
              <span className="text-brand-red">
                A Complete Healthcare AI Ecosystem
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This program covers the complete lifecycle of AI in medical
              imaging — from raw data acquisition to production deployment. No
              other program in India offers this level of clinical + technical
              integration.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-brand-red font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              From Data to Deployment — The Complete Pipeline
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {PROGRAM_ITEMS.map((item, progIdx) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: progIdx * 0.07 }}
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-red/30 transition-all"
              >
                <item.icon className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm font-medium leading-snug">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Career Pathways ──────────────────────────────────────────────────────────

const CAREERS = [
  { title: "AI Medical Imaging Engineer", icon: Brain },
  { title: "Clinical AI Developer", icon: Cpu },
  { title: "Imaging Data Scientist", icon: BarChart3 },
  { title: "Healthcare Simulation AI Specialist", icon: Activity },
  { title: "Imaging MLOps Engineer", icon: Network },
  { title: "Teleradiology Workflow Engineer", icon: Layers },
  { title: "Annotation Quality Lead", icon: Target },
];

function CareerPathways() {
  return (
    <section
      id="careers"
      className="bg-brand-red py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white display-font tracking-tight">
            Career Opportunities After the Program
          </h2>
          <p className="text-white/75 mt-3 max-w-lg mx-auto">
            Step into high-demand roles at the intersection of healthcare, AI,
            and imaging technology.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CAREERS.map((career, careerIdx) => (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: careerIdx * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-5 hover:bg-white/22 transition-all"
            >
              <career.icon className="w-6 h-6 text-white mb-3" />
              <h3 className="text-white font-bold text-sm leading-snug">
                {career.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Curriculum Timeline ──────────────────────────────────────────────────────

const CURRICULUM = [
  {
    month: "01",
    title: "AI & Programming Foundations",
    desc: "Python, NumPy, ML fundamentals, data structures, and an introduction to healthcare AI concepts and tools.",
  },
  {
    month: "02",
    title: "Clinical Imaging Essentials",
    desc: "DICOM standards, X-Ray, CT, MRI, and Ultrasound — understanding clinical imaging pipelines and anatomy of medical datasets.",
  },
  {
    month: "03",
    title: "Annotation & Dataset Engineering",
    desc: "Medical image labeling, segmentation annotation, dataset curation, quality control, and annotation science methodologies.",
  },
  {
    month: "04",
    title: "Deep Learning for Imaging",
    desc: "CNNs, U-Net, ViT for medical imaging. Classification, detection, and segmentation model training and evaluation.",
  },
  {
    month: "05",
    title: "Advanced AI & Simulation",
    desc: "Generative AI, agentic workflows, 3D/4D visualization, teleradiology, and AI-powered clinical simulation systems.",
  },
  {
    month: "06",
    title: "Deployment + Capstone + Industry Demo Day",
    desc: "MLOps, model deployment pipelines, capstone project delivery, and live demonstration to industry mentors.",
  },
];

function CurriculumTimeline() {
  return (
    <section id="curriculum" className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-brand-red/10 text-brand-red border-brand-red/20 mb-4 text-xs font-semibold px-3 py-1">
            6-Month Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 display-font tracking-tight">
            Curriculum Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-red via-brand-red/40 to-transparent" />

          <div className="space-y-10">
            {CURRICULUM.map((item, idx) => (
              <motion.div
                key={item.month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                data-ocid={`curriculum.item.${idx + 1}`}
                className={`relative flex gap-6 sm:gap-0 ${
                  idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Number dot */}
                <div className="flex-shrink-0 relative z-10 flex items-start sm:items-center sm:justify-center sm:w-12 sm:mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-black display-font shadow-red-glow-sm">
                    {item.month}
                  </div>
                </div>

                {/* Content card — desktop */}
                <div
                  className={`sm:w-[calc(50%-2.5rem)] ${
                    idx % 2 === 0
                      ? "sm:pr-10 sm:text-right"
                      : "sm:pl-10 sm:ml-auto"
                  } pl-4 sm:pl-0`}
                >
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-brand-red/20 hover:shadow-sm transition-all">
                    <div className="text-xs font-bold text-brand-red uppercase tracking-widest mb-1">
                      Month {item.month}
                    </div>
                    <h3 className="text-gray-900 font-bold text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bootcamp Experience ──────────────────────────────────────────────────────

const EXPERIENCE_ITEMS = [
  {
    icon: Brain,
    title: "Develop Real DICOM-Based AI Systems",
    desc: "Build production-grade AI models trained on real DICOM datasets from clinical imaging archives.",
  },
  {
    icon: Cpu,
    title: "Build AI-Driven Clinical Simulators",
    desc: "Design and prototype AI-powered clinical simulation environments used in medical training.",
  },
  {
    icon: Target,
    title: "Create Product Prototypes",
    desc: "Ideate, build, and iterate on product-grade healthcare AI prototypes with real-world applicability.",
  },
  {
    icon: Users,
    title: "Deliver AI Demonstrations to Industry Mentors",
    desc: "Present your work at the Industry Demo Day to senior professionals and potential employers.",
  },
  {
    icon: Zap,
    title: "Agentic AI Automation Workflows",
    desc: "Design and implement advanced agentic AI pipelines for autonomous healthcare decision support.",
  },
];

function BootcampExperience() {
  return (
    <section id="bootcamp" className="bg-gray-100 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <Badge className="bg-brand-red/15 text-brand-red border-brand-red/25 mb-4 text-xs font-semibold px-3 py-1">
            Immersive R&D Program
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 display-font tracking-tight">
            The Bootcamp Experience
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-brand-red font-semibold text-sm mb-12"
        >
          This is a structured R&D immersion program — not a typical internship.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIENCE_ITEMS.map((item, expIdx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: expIdx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-red/15 border border-brand-red/25 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-brand-red" />
              </div>
              <h3 className="text-gray-900 font-bold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROI Section ──────────────────────────────────────────────────────────────

function ROISection() {
  return (
    <section className="bg-brand-red py-20 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white display-font tracking-tight">
            Program ROI
          </h2>
          <p className="text-white/75 mt-3">
            Your investment works for you from day one.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              label: "Program Fee",
              amount: "₹1,50,000",
              sub: "Total investment",
              highlight: false,
            },
            {
              label: "Bootcamp Stipend",
              amount: "₹90,000",
              sub: "You Earn Back",
              highlight: true,
            },
            {
              label: "Effective Net Cost",
              amount: "₹60,000",
              sub: "After stipend recovery",
              highlight: false,
            },
          ].map((card, roiIdx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: roiIdx * 0.1 }}
              className={`rounded-2xl p-8 text-center ${
                card.highlight
                  ? "bg-white shadow-xl scale-105 border-2 border-white"
                  : "bg-white/20 border border-white/30"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
                {card.label}
              </div>
              <div
                className={`text-4xl font-black display-font mb-2 ${
                  card.highlight ? "text-brand-red" : "text-white"
                }`}
              >
                {card.amount}
              </div>
              <div
                className={`text-sm font-medium ${
                  card.highlight ? "text-brand-red/70" : "text-white/70"
                }`}
              >
                {card.sub}
              </div>
              {card.highlight && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Earn Back!
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-3xl font-black text-white display-font leading-tight">
            Recover up to{" "}
            <span className="bg-white text-brand-red px-3 py-1 rounded-lg inline-block">
              60%
            </span>{" "}
            of your investment while learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Admissions Section ───────────────────────────────────────────────────────

function AdmissionsSection({ onApply }: { onApply: () => void }) {
  return (
    <section id="admissions" className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-bold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Admissions Open
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 display-font tracking-tight mb-4">
            Secure Your Seat
          </h2>

          <div className="inline-flex items-center gap-2 bg-brand-red/8 border border-brand-red/20 text-brand-red text-sm font-bold px-4 py-2 rounded-full mb-10">
            <Target className="w-4 h-4" />
            Limited to 10 Seats Per Batch
          </div>

          {/* Selection process */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { step: "01", label: "Application" },
              { step: "02", label: "Technical Screening" },
            ].map((s, admIdx) => (
              <div key={s.step} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center font-black text-sm display-font">
                    {s.step}
                  </div>
                  <span className="text-gray-700 font-semibold text-sm">
                    {s.label}
                  </span>
                </div>
                {admIdx < 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={onApply}
            size="lg"
            className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-10 py-4 rounded-full glow-red text-base"
            data-ocid="admissions.primary_button"
          >
            Apply Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA({ onApply }: { onApply: () => void }) {
  return (
    <section className="bg-gray-100 py-24 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(218,27,54,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(218,27,54,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.52 0.22 22)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 display-font tracking-tight leading-tight mb-5">
            Build Your Career in{" "}
            <span className="text-brand-red">Next-Generation</span> Healthcare
            AI
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Join India's most industry-integrated AI in Healthcare Imaging
            Bootcamp.
          </p>
          <Button
            onClick={onApply}
            size="lg"
            className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-12 py-5 rounded-full glow-red text-lg"
            data-ocid="cta.primary_button"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-white border-t border-gray-200 py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-red rounded-md flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-900 font-bold text-lg display-font">
                Med<span className="text-brand-red">AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              India's pioneering healthcare AI imaging bootcamp — where clinical
              expertise meets cutting-edge artificial intelligence.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-brand-red/20 border border-gray-200 flex items-center justify-center transition-colors"
              >
                <SiLinkedin className="w-4 h-4 text-gray-500 hover:text-brand-red" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-brand-red/20 border border-gray-200 flex items-center justify-center transition-colors"
              >
                <SiInstagram className="w-4 h-4 text-gray-500 hover:text-brand-red" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-brand-red/20 border border-gray-200 flex items-center justify-center transition-colors"
              >
                <SiYoutube className="w-4 h-4 text-gray-500 hover:text-brand-red" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">
              Programs
            </h4>
            <ul className="space-y-2">
              {[
                "Healthcare AI Imaging Bootcamp",
                "Clinical AI Development",
                "Medical Data Science",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#program"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">
              Admissions
            </h4>
            <ul className="space-y-2">
              {[
                "Apply Now",
                "Download Brochure",
                "Selection Process",
                "Batch Schedule",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#admissions"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-gray-500 text-sm">
                <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                +91 99999 99999
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 text-sm">
                <Mail className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                admissions@medai.in
              </li>
              <li className="flex items-start gap-2.5 text-gray-500 text-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                Noida, Uttar Pradesh, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            © {year} MedAI. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Built with <Heart className="w-3 h-3 inline text-brand-red" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky Apply Button + WhatsApp ──────────────────────────────────────────

function FloatingButtons({ onApply }: { onApply: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Apply Button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              onClick={onApply}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-6 py-3 rounded-full shadow-2xl glow-red"
              data-ocid="sticky.primary_button"
            >
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919999999999?text=I'm%20interested%20in%20the%20Healthcare%20AI%20Imaging%20Bootcamp"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-xl transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </motion.a>
    </>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [modal, setModal] = useState<ModalType>(null);

  const openApply = () => setModal("apply");
  const openBrochure = () => setModal("brochure");
  const closeModal = () => setModal(null);

  return (
    <div className="min-h-screen bg-white">
      <Toaster richColors />
      <Navbar onApply={openApply} />

      <main>
        <HeroSection onApply={openApply} onBrochure={openBrochure} />
        <EarnSection />
        <WhoShouldApply />
        <WhyDifferent />
        <CareerPathways />
        <CurriculumTimeline />
        <BootcampExperience />
        <ROISection />
        <AdmissionsSection onApply={openApply} />
        <FinalCTA onApply={openApply} />
      </main>

      <Footer />

      <FloatingButtons onApply={openApply} />

      <LeadCaptureModal open={modal === "apply"} onClose={closeModal} />
      <BrochureModal open={modal === "brochure"} onClose={closeModal} />
    </div>
  );
}

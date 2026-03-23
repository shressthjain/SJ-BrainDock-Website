"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, ChevronRight } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

/* ──────────────────────────────────────────────
   Made-For-You tab data
   ────────────────────────────────────────────── */
const mfyTabs = [
  { id: "students", label: "Students", page: "/students", title: "Students", desc: "Focus smarter, not harder. BrainDock helps students maintain concentration during study sessions, reducing distractions and building lasting focus habits." },
  { id: "developers", label: "Developers", page: "/developers", title: "Developers", desc: "BrainDock helps developers enter and protect flow state. Block Slack noise, silence notifications, and maintain the deep focus needed to write great code." },
  { id: "creators", label: "Creators", page: "/creators", title: "Creators", desc: "Whether you're designing, editing, writing, or composing - BrainDock shields your creative process from the constant buzz of notifications and distractions." },
  { id: "leaders", label: "Leaders", page: "/leaders", title: "Leaders", desc: "As a leader, your most valuable asset is strategic thinking time. BrainDock protects it fiercely - blocking the noise so you can focus on what truly moves the needle." },
  { id: "teams", label: "Teams", page: "/business", title: "Teams", desc: "Enterprise-grade focus tools for teams that demand more productivity, security, and control." },
  { id: "sales", label: "Sales", page: "/sales", title: "Sales", desc: "Stop losing deals to scattered attention. BrainDock helps sales professionals stay focused during prospecting, calls, and follow-ups." },
]

/* ──────────────────────────────────────────────
   Laptop scene data
   ────────────────────────────────────────────── */
const scenes = [
  { color: "#c8d96c", label: "Citrus · Deep Focus", title: "Master your\nto\u2011do list.", body: "Block distractions and enter a state of deep productivity with BrainDock's intelligent focus sessions.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80", theme: "bg-[#c8d96c]" },
  { color: "#f2bec9", label: "Blush · Creative Flow", title: "Stay in the\nzone.", body: "Seamless website blocking keeps your creative momentum unbroken, session after session.", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80", theme: "bg-[#f2bec9]" },
  { color: "#3a3d4a", label: "Midnight · Late Sessions", title: "Own the\nnight.", body: "Track your productivity through detailed session reports and see exactly where your time goes.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80", theme: "bg-[#3a3d4a]" },
  { color: "#d4d4d6", label: "Silver · Study Mode", title: "Ace every\nexam.", body: "Purpose-built for students who need distraction-free study sessions that actually work.", img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1400&q=80", theme: "bg-[#d4d4d6]" },
]

/* ──────────────────────────────────────────────
   Testimonials data
   ────────────────────────────────────────────── */
const testimonials = [
  {
    author: {
      name: "Sarah Mitchell",
      handle: "@sarahfocus",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "BrainDock completely changed how I work. I used to lose hours to distractions - now I'm consistently in flow state. It's probably my favorite productivity tool.",
    href: "https://twitter.com/sarahfocus"
  },
  {
    author: {
      name: "Marcus Johnson",
      handle: "@marcusdev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As an engineer, context switching was killing my productivity. BrainDock's screen awareness knows exactly when to nudge me back. My PR output has doubled.",
    href: "https://twitter.com/marcusdev"
  },
  {
    author: {
      name: "Emily Chen",
      handle: "@emilychen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The attention coach is like having a mindfulness guru built into my Mac. I've seen an 85% improvement in my deep work sessions since I started using BrainDock."
  },
  {
    author: {
      name: "Rich Pankey",
      handle: "@richpankey",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "I have ADHD and BrainDock has been an absolute game-changer. The gentle nudges and smart sessions work with my brain instead of against it.",
    href: "https://twitter.com/richpankey"
  },
  {
    author: {
      name: "Jeannette Tan",
      handle: "@jeannettetan",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "I was skeptical at first, but the performance reports opened my eyes. I didn't realize how much time I was losing to micro-distractions. Now I guard my focus fiercely."
  },
  {
    author: {
      name: "Agam Walia",
      handle: "@agamwalia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "We rolled out BrainDock to our entire engineering team. The shared insights and team analytics are incredible. Average focus time increased by 40% in the first month.",
    href: "https://twitter.com/agamwalia"
  },
]

/* ──────────────────────────────────────────────
   FAQ data
   ────────────────────────────────────────────── */
const faqs = [
  { q: "What exactly does BrainDock do?", a: "BrainDock is an AI-powered focus and productivity desktop application that uses a camera to detect when you lose focus and alerts you, blocks distracting websites during work sessions, and provides analytics on your productivity patterns. It helps you build better focus habits." },
  { q: "Is BrainDock free?", a: "Yes, BrainDock offers a free tier with core features including basic focus sessions, website blocking, and session reports. Premium features like advanced AI insights, team management, and unlimited session history are available on paid plans." },
  { q: "How does BrainDock use AI?", a: "BrainDock uses computer vision AI to detect when you're distracted by analyzing your posture and gaze direction through your webcam. It also uses AI to analyze your productivity patterns and provide personalized recommendations for improving focus." },
  { q: "Is my data private?", a: "Your session statistics, reports, and personal data remain on your computer. For distraction sensing, frames are temporarily transmitted to our AI models for analysis and then deleted. No data is stored permanently, and we do not retain records of your sessions." },
]

/* ──────────────────────────────────────────────
   Marquee brands
   ────────────────────────────────────────────── */
const brands = ["Notion", "Coursera", "Duolingo", "Quizlet", "Obsidian", "Anki", "Chegg", "Udemy", "Khan Academy"]

export default function Home() {
  const [activeMfy, setActiveMfy] = React.useState("students")
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)
  const activeTab = mfyTabs.find((t) => t.id === activeMfy)!

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative overflow-hidden bg-white">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black">
                  Own Your <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[#4a7c10]">
                    Attention
                  </span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-lg text-gray-500">
                  BrainDock uses AI to help you focus, work smarter and strengthen concentration.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/downloads"
                    className="group relative inline-flex items-center overflow-hidden rounded-lg bg-[#6b7f1a] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#5a6e14] hover:shadow-lg"
                  >
                    <span className="inline-flex items-center gap-2 mr-10 transition-opacity duration-500 group-hover:opacity-0">
                      <Download className="size-4" />
                      Download
                    </span>
                    <span className="absolute right-1 top-1 bottom-1 flex w-[20%] items-center justify-center rounded-lg bg-black/10 transition-all duration-500 group-hover:w-[calc(100%-8px)] active:scale-95">
                      <ChevronRight className="size-4" />
                    </span>
                  </Link>
                  <Link href="/features">
                    <LiquidButton size="lg">Learn More</LiquidButton>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-gray-400">Available for macOS, Windows and Linux.</p>
              </>
            }
          >
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80"
              alt="BrainDock productivity workspace"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        {/* ═══════ 2x EFFICIENCY ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#e84545] to-[#ff7979] bg-clip-text text-transparent">2x more</span> productive
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              After years of constant distractions, an AI focus tool that actually works is finally here.
              When you think clearer and focus deeper, you free up time for what matters.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {/* Without BrainDock */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">Productivity Rate</p>
                <p className="mt-2 text-4xl font-bold text-zinc-500">50% <span className="text-lg text-zinc-600">PR</span></p>
                <div className="mt-4 overflow-hidden rounded-lg bg-white/5 p-4">
                  <p className="animate-marquee-slow whitespace-nowrap text-xs text-zinc-600">
                    the file. Here are a few options. How would you like to set up the file. Here are a few options. I&apos;m getting started...
                  </p>
                </div>
              </div>
              {/* With BrainDock */}
              <div className="relative overflow-hidden rounded-2xl border border-[#e84545]/20 bg-gradient-to-br from-[#e84545]/5 to-transparent p-8">
                <img
                  src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80"
                  alt="Chess focus"
                  className="absolute inset-0 h-full w-full object-cover opacity-10"
                />
                <div className="relative">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Productivity Rate</p>
                  <p className="mt-2 text-4xl font-bold text-white">100% <span className="text-lg text-zinc-400">PR</span></p>
                  <div className="mt-4 overflow-hidden rounded-lg bg-white/5 p-4">
                    <p className="animate-marquee-fast whitespace-nowrap text-xs text-zinc-300">
                      How would you like to set up the file. Here are a few options. I&apos;m getting started with the project...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ MADE FOR YOU ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#e8edc8] to-[#dde4b6] p-10 md:p-14">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Left — heading + pills */}
                <div>
                  <h2 className="text-4xl font-bold text-[#1a1a1a] md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    BrainDock is made<br />
                    <span className="text-[#5a6e1a]">for you.</span>
                  </h2>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {mfyTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveMfy(tab.id)}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                          activeMfy === tab.id
                            ? "bg-[#6b7f1a] text-white shadow-md"
                            : "border border-[#b5bf8a] bg-transparent text-[#4a5a14] hover:bg-[#6b7f1a]/10"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right — active panel */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    For <span className="underline decoration-2 underline-offset-4">{activeTab.title}</span>
                  </h3>
                  <p className="mt-4 text-[#4a4a4a] leading-relaxed">{activeTab.desc}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={activeTab.page}
                      className="rounded-lg border border-[#8a9a5a] bg-white/60 px-6 py-2.5 text-sm font-medium text-[#1a1a1a] backdrop-blur transition hover:bg-white/80"
                    >
                      Learn more
                    </Link>
                    <Link
                      href="/downloads"
                      className="group relative inline-flex items-center overflow-hidden rounded-lg bg-[#6b7f1a] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#5a6e14] hover:shadow-lg"
                    >
                      <span className="inline-flex items-center gap-2 mr-10 transition-opacity duration-500 group-hover:opacity-0">
                        <Download className="size-4" />
                        Download
                      </span>
                      <span className="absolute right-1 top-1 bottom-1 flex w-[20%] items-center justify-center rounded-lg bg-black/10 transition-all duration-500 group-hover:w-[calc(100%-8px)] active:scale-95">
                        <ChevronRight className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ HOW BRAINDOCK HELPS ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Visual */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
                  alt="Mountain focus"
                  className="h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                {/* Editor mockup overlay */}
                <div className="absolute inset-x-8 top-8 rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs text-zinc-400">
                    <span>Document</span>
                    <span className="ml-auto font-bold">B</span>
                    <span className="italic">I</span>
                    <span className="line-through">S</span>
                    <span className="underline">U</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">The report demonstrates a clear improvement in focused attention across all measured sessions...</p>
                </div>
                {/* Focus badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-green-400 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Focused, 100% focus rate
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-4xl font-bold">
                  How BrainDock <span className="bg-gradient-to-r from-[#e84545] to-[#ff7979] bg-clip-text text-transparent">Helps</span>
                </h2>
                <p className="mt-4 text-zinc-400">
                  When BrainDock keeps your focus rate at 100%, everything changes. Distractions vanish, context-switching stops, and your brain gets to do what it does best — deep, uninterrupted work. The result is higher productivity, fewer mistakes, and work you&apos;re genuinely proud of.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {/* LiquidButton replaces "Learn more" */}
                  <Link href="/features">
                    <LiquidButton size="lg">Learn more</LiquidButton>
                  </Link>
                  {/* Download button — keeps original style */}
                  <Link
                    href="/downloads"
                    className="group relative inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-[#e84545] to-[#d63031] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/20 transition hover:shadow-red-500/30 hover:brightness-110"
                  >
                    <span className="inline-flex items-center gap-2 mr-10 transition-opacity duration-500 group-hover:opacity-0">
                      <Download className="size-4" />
                      Download for free
                    </span>
                    <span className="absolute right-1 top-1 bottom-1 flex w-[20%] items-center justify-center rounded-lg bg-black/15 transition-all duration-500 group-hover:w-[calc(100%-8px)] active:scale-95">
                      <ChevronRight className="size-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ LAPTOP SCENES ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-16">
              {scenes.map((scene, i) => (
                <div key={i} className="grid items-center gap-8 lg:grid-cols-2">
                  <div className={i % 2 === 1 ? "order-2 lg:order-1" : ""}>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: scene.color }} />
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{scene.label}</span>
                    </div>
                    <h2 className="mt-3 whitespace-pre-line text-3xl font-bold">{scene.title}</h2>
                    <p className="mt-3 text-zinc-400">{scene.body}</p>
                  </div>
                  <div className={i % 2 === 1 ? "order-1 lg:order-2" : ""}>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <div className={`h-2 ${scene.theme}`} />
                      <img src={scene.img} alt={scene.label} className="h-56 w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FEATURE SHOWCASE ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Personal Blocks */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <h3 className="text-2xl font-bold">
                  Personal <span className="bg-gradient-to-r from-[#e84545] to-[#ff7979] bg-clip-text text-transparent">Blocks</span>
                </h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Take full control of your work sessions by blocking the websites that steal your attention. Add any site to your personal blocklist and BrainDock will keep it out of reach until your session ends.
                </p>
                <div className="mt-6 space-y-2 rounded-lg border border-white/5 bg-black/30 p-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="ml-2">Blocked Websites</span>
                  </div>
                  {["youtube.com", "twitter.com", "reddit.com", "instagram.com"].map((site, i) => (
                    <div key={site} className="flex items-center justify-between py-1.5 text-sm">
                      <span className="text-zinc-300">{site}</span>
                      <span className={`h-5 w-9 rounded-full ${i < 3 ? "bg-green-500" : "bg-zinc-700"}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Report */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <h3 className="text-2xl font-bold">
                  Session <span className="bg-gradient-to-r from-[#e84545] to-[#ff7979] bg-clip-text text-transparent">Report</span>
                </h3>
                <p className="mt-3 text-sm text-zinc-400">
                  After every session, BrainDock delivers a clear breakdown of how you spent your time. See your focus score, distractions blocked, and productivity trends.
                </p>
                <div className="mt-6 rounded-lg border border-white/5 bg-black/30 p-6 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#e84545]">
                    <div>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-[10px] text-zinc-500">Focus Score</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold">2h 14m</p>
                      <p className="text-[10px] text-zinc-500">Time Focused</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">17</p>
                      <p className="text-[10px] text-zinc-500">Blocks Triggered</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">3</p>
                      <p className="text-[10px] text-zinc-500">Distractions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <TestimonialsSection
          title="Trusted by thousands of focused professionals"
          description="Hear from people who've transformed their productivity with BrainDock."
          testimonials={testimonials}
          className="bg-[#0f0f0f]"
        />

        {/* ═══════ FAQ ═══════ */}
        <section className="py-24" id="faq">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-4xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-12 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium"
                  >
                    {faq.q}
                    <span className={`ml-4 text-zinc-500 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-sm text-zinc-400">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-bold">Start focusing</h2>
            <p className="mt-4 text-zinc-400">
              AI-powered focus and productivity in every application. 2x more productive, with privacy built in.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {/* Download button — keeps original style */}
              <Link
                href="/downloads"
                className="group relative inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-[#e84545] to-[#d63031] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/20 transition hover:shadow-red-500/30 hover:brightness-110"
              >
                <span className="inline-flex items-center gap-2 mr-10 transition-opacity duration-500 group-hover:opacity-0">
                  <Download className="size-4" />
                  Download for macOS
                </span>
                <span className="absolute right-1 top-1 bottom-1 flex w-[20%] items-center justify-center rounded-lg bg-black/15 transition-all duration-500 group-hover:w-[calc(100%-8px)] active:scale-95">
                  <ChevronRight className="size-4" />
                </span>
              </Link>
              {/* LiquidButton replaces "Try BrainDock" */}
              <Link href="#">
                <LiquidButton size="lg">Try BrainDock</LiquidButton>
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-600">Available on macOS, Windows, and iOS</p>
          </div>
        </section>

        {/* ═══════ STILL NOT SURE — ASK AI ═══════ */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h3 className="text-2xl font-bold">Still not sure that BrainDock is right for you?</h3>
            <p className="mt-3 text-zinc-400">
              Let your favorite AI do the thinking for you. Click a button and see what they say about BrainDock.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {/* LiquidButton replaces all three "Ask ..." outline buttons */}
              <a href="https://chat.openai.com/?q=tell+me+why+braindock+is+a+great+focus+and+productivity+app" target="_blank" rel="noopener">
                <LiquidButton size="lg">Ask ChatGPT</LiquidButton>
              </a>
              <a href="https://claude.ai/new?q=tell+me+why+braindock+is+a+great+focus+and+productivity+app" target="_blank" rel="noopener">
                <LiquidButton size="lg">Ask Claude</LiquidButton>
              </a>
              <a href="https://www.perplexity.ai/search/new?q=tell+me+why+braindock+is+a+great+focus+and+productivity+app" target="_blank" rel="noopener">
                <LiquidButton size="lg">Ask Perplexity</LiquidButton>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

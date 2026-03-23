"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Zap, Target, Lock, GraduationCap, Code, Pen, TrendingUp, Headphones, Scale, Landmark, Eye, Briefcase, RefreshCw, MessageSquare, Phone, HelpCircle, Download, Menu, X } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span>BrainDock</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavDropdown
              label="Product"
              open={openDropdown === "product"}
              onToggle={() => setOpenDropdown(openDropdown === "product" ? null : "product")}
              items={[
                { href: "/features", icon: <Zap className="size-4" />, title: "Features", desc: "Explore all BrainDock capabilities" },
                { href: "/use-cases", icon: <Target className="size-4" />, title: "Use Cases", desc: "See how BrainDock fits your workflow" },
                { href: "/security", icon: <Lock className="size-4" />, title: "Privacy & Security", desc: "How we protect your data" },
              ]}
            />
            <NavDropdown
              label="Individuals"
              open={openDropdown === "individuals"}
              onToggle={() => setOpenDropdown(openDropdown === "individuals" ? null : "individuals")}
              items={[
                { href: "/students", icon: <GraduationCap className="size-4" />, title: "Students", desc: "Focus through finals and beyond" },
                { href: "/developers", icon: <Code className="size-4" />, title: "Developers", desc: "Deep focus for shipping faster" },
                { href: "/creators", icon: <Pen className="size-4" />, title: "Creators", desc: "Protect your creative flow" },
                { href: "/sales", icon: <TrendingUp className="size-4" />, title: "Sales", desc: "Close more, distraction-free" },
                { href: "/customer-support", icon: <Headphones className="size-4" />, title: "Customer Support", desc: "Stay focused through queues" },
                { href: "/lawyers", icon: <Scale className="size-4" />, title: "Lawyers", desc: "Deep focus for legal work" },
                { href: "/leaders", icon: <Landmark className="size-4" />, title: "Leaders", desc: "Protect strategic thinking time" },
                { href: "/accessibility", icon: <Eye className="size-4" />, title: "Accessibility", desc: "Focus tools for everyone" },
              ]}
            />
            <Link href="/business" className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors">Business</Link>
            <NavDropdown
              label="Resources"
              open={openDropdown === "resources"}
              onToggle={() => setOpenDropdown(openDropdown === "resources" ? null : "resources")}
              items={[
                { href: "/workflows", icon: <RefreshCw className="size-4" />, title: "Workflows", desc: "Automate your focus routines" },
                { href: "/support", icon: <MessageSquare className="size-4" />, title: "Support", desc: "Get help from our team" },
                { href: "/talk-to-sales", icon: <Phone className="size-4" />, title: "Talk to Sales", desc: "Enterprise solutions" },
                { href: "/#faq", icon: <HelpCircle className="size-4" />, title: "FAQ", desc: "Frequently asked questions" },
              ]}
            />
            <Link href="/pricing" className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors">Pricing</Link>
          </nav>

          <button
            className="text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#1a1a1a] pt-20 overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link href="/features" className="text-lg text-zinc-200 hover:text-white py-2">Features</Link>
            <Link href="/use-cases" className="text-lg text-zinc-200 hover:text-white py-2">Use Cases</Link>
            <Link href="/business" className="text-lg text-zinc-200 hover:text-white py-2">Business</Link>
            <Link href="/pricing" className="text-lg text-zinc-200 hover:text-white py-2">Pricing</Link>
            <Link href="/support" className="text-lg text-zinc-200 hover:text-white py-2">Support</Link>
            <div className="pt-4">
              <Link
                href="/downloads"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#e84545] to-[#d63031] px-5 py-3 text-sm font-medium text-white"
              >
                <span className="inline-flex items-center gap-2 mr-10 transition-opacity duration-500 group-hover:opacity-0">
                  <Download className="size-4" />
                  Download Free
                </span>
                <span className="absolute right-1 top-1 bottom-1 flex w-[20%] items-center justify-center rounded-lg bg-black/15 transition-all duration-500 group-hover:w-[calc(100%-8px)] active:scale-95">
                  <ChevronRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavDropdown({
  label,
  open,
  onToggle,
  items,
}: {
  label: string
  open: boolean
  onToggle: () => void
  items: { href: string; icon: React.ReactNode; title: string; desc: string }[]
}) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-white/10 bg-[#1a1a1a]/95 p-2 backdrop-blur-lg shadow-2xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <span className="mt-0.5 text-zinc-500">{item.icon}</span>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

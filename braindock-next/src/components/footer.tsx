import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-white">BrainDock</Link>
            <p className="mt-4 text-sm text-zinc-500">
              AI-powered focus and productivity that helps you work smarter and focus deeper.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://twitter.com/braindock" target="_blank" rel="noopener" aria-label="Twitter" className="text-zinc-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/braindock" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-zinc-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com/braindock" target="_blank" rel="noopener" aria-label="GitHub" className="text-zinc-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <Link href="/about" className="text-sm text-zinc-500 hover:text-white transition-colors">About</Link>
            <Link href="/careers" className="text-sm text-zinc-500 hover:text-white transition-colors">Careers</Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Trust Center</Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Become an Affiliate</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <Link href="/security" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy & Security</Link>
            <Link href="/use-cases" className="text-sm text-zinc-500 hover:text-white transition-colors">Use Cases</Link>
            <Link href="/students" className="text-sm text-zinc-500 hover:text-white transition-colors">BrainDock for Students</Link>
            <Link href="/pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link>
            <Link href="/downloads" className="text-sm text-zinc-500 hover:text-white transition-colors">Download</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <Link href="/workflows" className="text-sm text-zinc-500 hover:text-white transition-colors">Workflows</Link>
            <Link href="/support" className="text-sm text-zinc-500 hover:text-white transition-colors">Talk to Support</Link>
            <Link href="/talk-to-sales" className="text-sm text-zinc-500 hover:text-white transition-colors">Talk to Sales</Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">&copy; 2026 BrainDock, Inc.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-zinc-600 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-sm text-zinc-600 hover:text-white transition-colors">Privacy</Link>
            <Link href="/data-controls" className="text-sm text-zinc-600 hover:text-white transition-colors">Data Controls</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

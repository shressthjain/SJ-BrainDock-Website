"use client";

import * as React from "react";
import {
  Mail,
  MessageSquare,
  Video,
  CalendarDays,
  Globe,
  Smartphone,
  FileEdit,
  FileText,
  ClipboardList,
  FileType,
  Code,
  Terminal,
  GitPullRequest,
  FlaskConical,
  Target,
  Laptop,
  BarChart3,
  CheckSquare,
  Columns3,
  Ruler,
  PenLine,
  Newspaper,
  BookOpen,
  Clapperboard,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
}

interface TabData {
  id: string;
  label: string;
  items: UseCase[];
}

const tabs: TabData[] = [
  {
    id: "essential",
    label: "Essential Apps",
    items: [
      {
        icon: <Mail className="h-4 w-4" />,
        title: "Email",
        description:
          "Stay focused while processing your inbox. BrainDock helps you batch emails instead of constantly checking.",
        tags: ["Gmail", "Outlook", "Apple Mail"],
      },
      {
        icon: <MessageSquare className="h-4 w-4" />,
        title: "Messaging",
        description:
          "Keep chats from derailing your focus. Smart notifications let through what matters, silences what doesn't.",
        tags: ["Slack", "Teams", "Discord"],
      },
      {
        icon: <Video className="h-4 w-4" />,
        title: "Video Calls",
        description:
          "Automatically pause focus sessions for scheduled calls and resume right after. No manual toggling needed.",
        tags: ["Zoom", "Google Meet", "Teams"],
      },
      {
        icon: <CalendarDays className="h-4 w-4" />,
        title: "Calendar",
        description:
          "BrainDock reads your calendar to find and protect deep work blocks throughout your day.",
        tags: ["Google Calendar", "Outlook"],
      },
      {
        icon: <Globe className="h-4 w-4" />,
        title: "Web Browsing",
        description:
          "Gently redirects you when you drift to distracting sites during focus sessions.",
        tags: ["Chrome", "Safari", "Firefox"],
      },
      {
        icon: <Smartphone className="h-4 w-4" />,
        title: "Social Media",
        description:
          "Block or limit social media during focus time. Review usage stats to build better habits.",
        tags: ["Twitter/X", "Instagram", "Reddit"],
      },
    ],
  },
  {
    id: "documentation",
    label: "Documentation",
    items: [
      {
        icon: <FileEdit className="h-4 w-4" />,
        title: "Google Docs",
        description:
          "Write distraction-free in Google Docs with BrainDock tracking your focus score and protecting your flow.",
      },
      {
        icon: <FileText className="h-4 w-4" />,
        title: "Notion",
        description:
          "Build your second brain without losing focus. BrainDock ensures you stay on-task in Notion.",
      },
      {
        icon: <ClipboardList className="h-4 w-4" />,
        title: "Confluence",
        description:
          "Research and write documentation without the constant context-switching that kills productivity.",
      },
      {
        icon: <FileType className="h-4 w-4" />,
        title: "Microsoft Word",
        description:
          "Deep work in Word with BrainDock monitoring your attention and nudging you back when you drift.",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    items: [
      {
        icon: <Code className="h-4 w-4" />,
        title: "VS Code",
        description:
          "Ship code faster with deep focus sessions. BrainDock blocks distractions while you're in flow.",
      },
      {
        icon: <Terminal className="h-4 w-4" />,
        title: "Terminal",
        description:
          "Stay in the terminal without getting pulled into Slack. BrainDock shields your workflow.",
      },
      {
        icon: <GitPullRequest className="h-4 w-4" />,
        title: "GitHub",
        description:
          "Review PRs and manage issues with focused attention. No rabbit holes, just meaningful work.",
      },
      {
        icon: <FlaskConical className="h-4 w-4" />,
        title: "Jupyter",
        description:
          "Run experiments and analyze data without getting sidetracked. Perfect for research work.",
      },
      {
        icon: <Target className="h-4 w-4" />,
        title: "IntelliJ / JetBrains",
        description:
          "Full IDE support for Java, Python, Go, and more. BrainDock protects your deepest coding sessions.",
      },
      {
        icon: <Laptop className="h-4 w-4" />,
        title: "Xcode",
        description:
          "Build iOS and macOS apps with uninterrupted focus. Let BrainDock handle the rest.",
      },
    ],
  },
  {
    id: "project",
    label: "Project Management",
    items: [
      {
        icon: <BarChart3 className="h-4 w-4" />,
        title: "Jira",
        description:
          "Manage sprints and tickets with focused execution. BrainDock keeps you on the current task.",
      },
      {
        icon: <CheckSquare className="h-4 w-4" />,
        title: "Asana",
        description:
          "Work through tasks sequentially without jumping between projects. Deep focus on what matters.",
      },
      {
        icon: <Columns3 className="h-4 w-4" />,
        title: "Trello",
        description:
          'Move cards from "Doing" to "Done" faster with distraction-free focus sessions.',
      },
      {
        icon: <Ruler className="h-4 w-4" />,
        title: "Linear",
        description:
          "Ship faster with focused issue tracking. BrainDock + Linear = developer productivity.",
      },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    items: [
      {
        icon: <PenLine className="h-4 w-4" />,
        title: "Blog Writing",
        description:
          "Write long-form content without losing your train of thought. BrainDock protects your writing sessions.",
      },
      {
        icon: <Newspaper className="h-4 w-4" />,
        title: "Newsletter Creation",
        description:
          "Draft, edit, and send newsletters with sustained focus. No more half-written campaigns.",
      },
      {
        icon: <BookOpen className="h-4 w-4" />,
        title: "Academic Writing",
        description:
          "Write papers, theses, and research with deep focus. Perfect for students and academics.",
      },
      {
        icon: <Clapperboard className="h-4 w-4" />,
        title: "Script Writing",
        description:
          "Craft screenplays and video scripts without distraction. Get into the creative zone and stay there.",
      },
    ],
  },
];

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  area?: string;
}

const GridItem = ({ icon, title, description, tags, area }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground border-[0.75px] border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// Bento grid area assignments matching the demo.tsx layout pattern
// For 6 items: 2 rows of 3 in md, asymmetric bento in xl
// For 4 items: 2 rows of 2 in md, asymmetric bento in xl
// For 5 items: matches demo.tsx exactly
const gridAreas: Record<number, string[]> = {
  4: [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]",
  ],
  5: [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  ],
  6: [
    "md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/5/2/9] xl:[grid-area:1/5/2/9]",
    "md:[grid-area:1/9/2/13] xl:[grid-area:1/9/2/13]",
    "md:[grid-area:2/1/3/5] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/5/3/9] xl:[grid-area:2/5/3/9]",
    "md:[grid-area:2/9/3/13] xl:[grid-area:2/9/3/13]",
  ],
};

function getGridArea(total: number, index: number): string {
  const areas = gridAreas[total] ?? gridAreas[6];
  return areas[index] ?? "";
}

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = React.useState("essential");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl text-foreground">
            BrainDock works with{" "}
            <span className="bg-gradient-to-r from-[#e84545] to-[#ff7979] bg-clip-text text-transparent">
              everything
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Focus across every app, every tab, and every workflow. BrainDock
            integrates seamlessly with the tools you already use.
          </p>
        </section>

        {/* Tabs */}
        <section className="mx-auto mt-16 max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <ul className="mt-12 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            {currentTab.items.map((item, i) => (
              <GridItem
                key={item.title}
                area={getGridArea(currentTab.items.length, i)}
                icon={item.icon}
                title={item.title}
                description={item.description}
                tags={item.tags}
              />
            ))}
          </ul>
        </section>

        {/* Stats */}
        <section className="mx-auto mt-24 max-w-3xl px-6 text-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-foreground">100+</p>
              <p className="mt-1 text-sm text-muted-foreground">Apps supported</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">3</p>
              <p className="mt-1 text-sm text-muted-foreground">Platforms</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">0</p>
              <p className="mt-1 text-sm text-muted-foreground">Config needed</p>
            </div>
          </div>
          <p className="mt-8 text-muted-foreground">
            BrainDock works inside any application - no plugins, extensions, or
            setup required.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

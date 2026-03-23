import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col items-center justify-center gap-12 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Liquid Glass Button Demo</h1>

      {/* Demo One — centered liquid glass */}
      <div className="relative h-[200px] w-[800px] max-w-full rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=80"
          alt="Mountain landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <LiquidButton className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          Liquid Glass
        </LiquidButton>
      </div>

      {/* Variant showcase */}
      <div className="flex flex-wrap gap-6 items-center justify-center">
        <LiquidButton size="sm">Small</LiquidButton>
        <LiquidButton size="default">Default</LiquidButton>
        <LiquidButton size="lg">Large</LiquidButton>
        <LiquidButton size="xl">Extra Large</LiquidButton>
        <LiquidButton size="xxl">XXL Button</LiquidButton>
      </div>

      <div className="flex flex-wrap gap-6 items-center justify-center">
        <LiquidButton variant="default">Default</LiquidButton>
        <LiquidButton variant="destructive">Destructive</LiquidButton>
        <LiquidButton variant="outline">Outline</LiquidButton>
        <LiquidButton variant="secondary">Secondary</LiquidButton>
        <LiquidButton variant="ghost">Ghost</LiquidButton>
        <LiquidButton variant="link">Link</LiquidButton>
      </div>

      {/* BrainDock themed examples */}
      <div className="relative h-[300px] w-full max-w-3xl rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80"
          alt="Starry mountain"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">BrainDock Buttons</h2>
          <div className="flex gap-4">
            <LiquidButton size="lg">Learn More</LiquidButton>
            <LiquidButton size="lg">Try BrainDock</LiquidButton>
            <LiquidButton size="lg">Ask Claude</LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}

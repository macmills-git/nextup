import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasLeadersCarousel from "@/components/landing/saas/SaasLeadersCarousel";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasWorldMapSection from "@/components/landing/saas/SaasWorldMapSection";
import SaasTestimonialWall from "@/components/landing/saas/SaasTestimonialWall";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const Index = () => {
  return (
    <div className="min-h-screen relative z-[1] bg-secondary/40">
      <Navbar />

      {/* Hero — clean light surface */}
      <div className="bg-background">
        <SaasHeroSection />
      </div>

      {/* Leaders — muted contrast band */}
      <div className="bg-secondary border-y border-border/40">
        <SaasLeadersCarousel />
      </div>

      {/* MacBook showcase — full dark inversion */}
      <SaasMacBookShowcase />

      {/* Bento "Built for Event Intelligence" / "Making Planners 10x faster"
          — warm cream tinted canvas with dotted grid + radial coral glow */}
      <div className="relative overflow-hidden border-y border-border/40"
           style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(35 40% 96%) 50%, hsl(var(--background)) 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
             style={{
               backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
               backgroundSize: '28px 28px',
             }} />
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[620px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="relative">
          <SaasBentoFeatures />
        </div>
      </div>

      {/* Trusted worldwide — deep ink band with concentric rings + grid */}
      <div className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
             style={{
               backgroundImage: 'linear-gradient(hsl(var(--background)/0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)/0.6) 1px, transparent 1px)',
               backgroundSize: '80px 80px',
             }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-background/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-background/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-background/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-background/10" />
        <div className="relative [&_*]:!text-background/90 [&_.text-foreground]:!text-background [&_.text-muted-foreground]:!text-background/60 [&_.bg-card]:!bg-background/[0.04] [&_.border-border\/15]:!border-background/10 [&_.bg-border\/10]:!bg-background/5">
          <SaasWorldMapSection />
        </div>
      </div>

      {/* Testimonials — clean surface */}
      <div className="bg-background border-t border-border/40">
        <SaasTestimonialWall />
      </div>

      {/* CTA — accent gradient band */}
      <div className="bg-gradient-to-b from-secondary/60 to-background">
        <SaasCTASection />
      </div>

      <SaasFooter />
    </div>
  );
};

export default Index;

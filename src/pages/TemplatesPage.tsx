import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, DollarSign, Star, Crown, Gem } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Weddings", "Corporate", "Conferences", "Social", "Birthday", "Workshops"];
const budgetTiers = [
  { label: "All", icon: null },
  { label: "Regular", icon: DollarSign },
  { label: "Premium", icon: Crown },
  { label: "Luxury", icon: Gem },
];

const templates = [
  { name: "Classic Wedding", category: "Weddings", budget: "Premium", guests: "100-200", duration: "1 day", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", rating: 4.9, uses: "12.4k" },
  { name: "Tech Conference", category: "Conferences", budget: "Luxury", guests: "500-1000", duration: "3 days", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", rating: 4.8, uses: "8.2k" },
  { name: "Team Building Day", category: "Corporate", budget: "Regular", guests: "20-50", duration: "1 day", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop", rating: 4.7, uses: "15.1k" },
  { name: "Garden Party", category: "Social", budget: "Regular", guests: "30-80", duration: "4 hours", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop", rating: 4.6, uses: "9.3k" },
  { name: "Milestone Birthday", category: "Birthday", budget: "Premium", guests: "50-100", duration: "6 hours", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop", rating: 4.8, uses: "11.7k" },
  { name: "Executive Summit", category: "Corporate", budget: "Luxury", guests: "50-100", duration: "2 days", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop", rating: 4.9, uses: "6.5k" },
  { name: "Creative Workshop", category: "Workshops", budget: "Regular", guests: "10-30", duration: "3 hours", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", rating: 4.5, uses: "7.8k" },
  { name: "Destination Wedding", category: "Weddings", budget: "Luxury", guests: "50-150", duration: "3 days", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", rating: 4.9, uses: "5.9k" },
  { name: "Product Launch", category: "Corporate", budget: "Premium", guests: "100-300", duration: "1 day", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", rating: 4.7, uses: "10.2k" },
  { name: "Networking Mixer", category: "Social", budget: "Regular", guests: "50-150", duration: "3 hours", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", rating: 4.6, uses: "13.0k" },
  { name: "Academic Conference", category: "Conferences", budget: "Premium", guests: "200-500", duration: "2 days", image: "https://images.unsplash.com/photo-1587825140708-dfaf18c4f4c0?w=400&h=300&fit=crop", rating: 4.8, uses: "4.3k" },
  { name: "Kids Birthday Bash", category: "Birthday", budget: "Regular", guests: "15-40", duration: "3 hours", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop", rating: 4.7, uses: "18.6k" },
];

const budgetColor: Record<string, string> = {
  Regular: '#10B981',
  Premium: '#F59E0B',
  Luxury: '#8B5CF6',
};

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBudget, setActiveBudget] = useState("All");

  const filtered = templates.filter(t =>
    (activeCategory === "All" || t.category === activeCategory) &&
    (activeBudget === "All" || t.budget === activeBudget)
  );

  return (
    <div className="min-h-screen" style={{ background: '#0B0B0F' }}>
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Templates</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Start with a proven template
          </h1>
          <p className="text-sm md:text-base" style={{ color: '#9CA3AF' }}>
            Professionally designed event templates for every occasion and budget. Customize and launch in minutes.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                activeCategory === cat ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Budget tier filters */}
        <div className="flex justify-center gap-3 mb-12">
          {budgetTiers.map(tier => (
            <button
              key={tier.label}
              onClick={() => setActiveBudget(tier.label)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 ${
                activeBudget === tier.label ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
              style={{
                background: activeBudget === tier.label ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeBudget === tier.label ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {tier.icon && <tier.icon className="w-3.5 h-3.5" />}
              {tier.label}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {filtered.map((t, i) => (
            <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group" style={{
              background: 'linear-gradient(135deg, #16161D 0%, #121218 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}>
              <div className="relative h-44 overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{
                  background: budgetColor[t.budget] || '#3B82F6', color: 'white'
                }}>
                  {t.budget}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-white font-medium">{t.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-1">{t.name}</h3>
                <p className="text-xs mb-3" style={{ color: '#6B7280' }}>{t.category}</p>
                <div className="flex items-center gap-3 text-[11px] mb-4" style={{ color: '#9CA3AF' }}>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.guests}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.duration}</span>
                  <span>{t.uses} uses</span>
                </div>
                <Button size="sm" asChild className="w-full rounded-lg text-xs" style={{
                  background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)', border: 'none', color: 'white',
                }}>
                  <Link to="/signup">Use Template <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50">No templates found for this combination. Try adjusting your filters.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TemplatesPage;

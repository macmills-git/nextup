import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, Home, Calendar, Store, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigate to events or vendors depending on search query
    const q = searchQuery.toLowerCase();
    if (q.includes("vendor") || q.includes("dj") || q.includes("catering") || q.includes("mc") || q.includes("photo")) {
      navigate(`/vendors?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/events?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20">
      {/* 404 Header Navigation Bar */}
      <header className="w-full border-b border-stone-200/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Left Menu toggle / Home */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            <Menu className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">Menu</span>
          </Link>

          {/* Center Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="dark" size="md" showText={true} />
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/events")}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors"
              title="Explore Events"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/vendors")}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors"
              title="Find Vendors"
            >
              <Store className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main 404 Body - Directly styled after reference design */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center max-w-4xl mx-auto w-full">
        {/* Giant 404 Display Artwork */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4 select-none mb-6">
          {/* First "4" */}
          <span className="text-[90px] sm:text-[140px] md:text-[200px] font-black leading-none tracking-tighter text-slate-900 dark:text-slate-100 font-sans">
            4
          </span>

          {/* Custom Middle Logo Emblem as "0" */}
          <div className="relative w-[75px] h-[75px] sm:w-[115px] sm:h-[115px] md:w-[160px] md:h-[160px] flex items-center justify-center my-auto">
            <div className="w-full h-full rounded-full border-[12px] sm:border-[18px] md:border-[24px] border-slate-900 dark:border-slate-100 flex items-center justify-center p-2 relative shadow-xs">
              {/* Infinity loop curve SVG matching the reference emblem style */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-900 dark:text-slate-100 fill-current"
              >
                <path
                  d="M30,50 C30,35 45,35 50,50 C55,65 70,65 70,50 C70,35 55,35 50,50 C45,65 30,65 30,50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Second "4" */}
          <span className="text-[90px] sm:text-[140px] md:text-[200px] font-black leading-none tracking-tighter text-slate-900 dark:text-slate-100 font-sans">
            4
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          Page not found :(
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-md">
          Return to home page, or search for what you're looking for
        </p>

        {/* Pill Search Input Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xl mb-8">
          <div className="relative flex items-center rounded-full bg-stone-100/90 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 transition-all shadow-xs focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Weddings, Caterers, Venues, DJs..."
              className="w-full py-3.5 pl-6 pr-12 text-xs sm:text-sm bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder:text-stone-400 font-medium"
            />
            <button
              type="submit"
              className="absolute right-3.5 p-2 rounded-full text-stone-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" /> Explore Events
          </Link>
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
          >
            <Store className="w-3.5 h-3.5" /> Browse Vendors
          </Link>
        </div>
      </main>

      {/* Footer minimal credit bar */}
      <footer className="w-full border-t border-stone-200/60 py-4 text-center text-[11px] text-stone-400">
        &copy; {new Date().getFullYear()} NextUp. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;

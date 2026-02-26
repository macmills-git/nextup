import { TrendingUp, Users, MessageSquare, Calendar, Send, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DashboardShowcase = () => {
  const [goalValue, setGoalValue] = useState(350);

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Facts & Colors</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Give your planning a makeover
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A powerful dashboard that puts everything at your fingertips — revenue tracking, team management, messaging, scheduling, and goal setting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-[85%] mx-auto" style={{ fontSize: '0.9em' }}>

          {/* Total Revenue Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] transition-shadow duration-1000"
            style={{ animation: 'cardGlow1 6s ease-in-out infinite' }}>
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-white">$15,231.89</p>
              <p className="text-xs text-emerald-400 mt-1">+20.1% from last month</p>
            </div>
            <div className="mt-4">
              <svg viewBox="0 0 200 50" className="w-full h-12" fill="none">
                <polyline points="0,40 20,38 40,35 60,30 80,32 100,25 120,28 140,20 160,15 180,18 200,8" stroke="hsl(225, 90%, 60%)" strokeWidth="2" fill="none" />
                {[[0,40],[20,38],[40,35],[60,30],[80,32],[100,25],[120,28],[140,20],[160,15],[180,18],[200,8]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="hsl(225, 90%, 60%)" />
                ))}
              </svg>
            </div>
          </div>

          {/* Subscriptions Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 min-h-[220px]"
            style={{ animation: 'cardGlow2 6s ease-in-out infinite' }}>
            <p className="text-sm text-gray-400 mb-1">Subscriptions</p>
            <p className="text-3xl font-bold text-white">+2350</p>
            <p className="text-xs text-emerald-400 mt-1">+180.1% from last month</p>
            <div className="flex items-end gap-1.5 mt-6 h-20">
              {[60, 75, 85, 70, 90, 65, 80, 55, 95, 72, 88, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-white/90 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Calendar Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-5 min-h-[220px]"
            style={{ animation: 'cardGlow3 6s ease-in-out infinite' }}>
            <div className="flex items-center justify-between mb-3">
              <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              <span className="text-sm font-semibold text-white">June 2023</span>
              <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500 mb-2">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1].map((day, i) => {
                const isHighlighted = i >= 7 && i <= 11;
                const isToday = day === 13 && i === 14;
                const isOutside = i < 3 || i > 32;
                return (
                  <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-md text-[11px] mx-auto transition-colors ${
                    isToday ? "bg-white text-black font-bold" : isHighlighted ? "bg-white/20 text-white" : isOutside ? "text-gray-600" : "text-gray-300 hover:bg-white/10"
                  }`}>{day}</span>
                );
              })}
            </div>
          </div>

          {/* Move Goal Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 min-h-[220px]"
            style={{ animation: 'cardGlow4 6s ease-in-out infinite' }}>
            <p className="text-sm font-semibold text-white mb-1">Move Goal</p>
            <p className="text-xs text-gray-400 mb-4">Set your daily activity goal.</p>
            <div className="flex items-center justify-center gap-6 mb-3">
              <button onClick={() => setGoalValue(Math.max(100, goalValue - 10))} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <div className="text-center">
                <p className="text-4xl font-bold text-white">{goalValue}</p>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Calories/Day</p>
              </div>
              <button onClick={() => setGoalValue(goalValue + 10)} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-end gap-1 h-8 mb-4">
              {[40,60,80,50,70,90,45,65,85,55,75,95,50].map((h, i) => (
                <div key={i} className="flex-1 bg-white/80 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
            <button className="w-full py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Set Goal</button>
          </div>

          {/* Team Members Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 min-h-[260px]">
            <p className="text-sm font-semibold text-white mb-1">Team Members</p>
            <p className="text-xs text-gray-400 mb-5">Invite your team members to collaborate.</p>
            {[
              { name: "Sofia Davis", email: "m@example.com", role: "Owner" },
              { name: "Jackson Lee", email: "p@example.com", role: "Member" },
              { name: "Isabella Nguyen", email: "i@example.com", role: "Member" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{member.name}</p>
                    <p className="text-[11px] text-gray-500">{member.email}</p>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">{member.role} ▾</span>
              </div>
            ))}
          </div>

          {/* Chat Card */}
          <div className="lg:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col min-h-[260px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Sofia Davis</p>
                <p className="text-[11px] text-gray-500">m@example.com</p>
              </div>
              <button className="ml-auto w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 space-y-3 mb-4">
              <div className="bg-white/10 rounded-xl rounded-bl-sm px-3 py-2 text-sm text-gray-300 max-w-[80%]">Hi, how can I help you today?</div>
              <div className="bg-white/20 rounded-xl rounded-br-sm px-3 py-2 text-sm text-white max-w-[80%] ml-auto">Hey, I'm having trouble with my account.</div>
              <div className="bg-white/10 rounded-xl rounded-bl-sm px-3 py-2 text-sm text-gray-300 max-w-[80%]">What seems to be the problem?</div>
              <div className="bg-white/20 rounded-xl rounded-br-sm px-3 py-2 text-sm text-white max-w-[80%] ml-auto">I can't log in.</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Type your message..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white/30 transition-colors" />
              <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Event Analytics Card */}
          <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6 min-h-[260px]">
            <p className="text-sm font-semibold text-white mb-1">Event Analytics</p>
            <p className="text-xs text-gray-400 mb-6">Your event performance is ahead of where you normally are.</p>
            <div className="relative">
              <svg viewBox="0 0 400 120" className="w-full h-32" fill="none">
                <path d="M0,90 C30,85 60,70 100,50 C140,30 160,20 200,15 C240,10 260,45 300,55 C340,65 370,50 400,45" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M0,70 C30,75 60,80 100,75 C140,70 160,60 200,65 C240,70 260,55 300,50 C340,45 370,55 400,60" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
                {[[0,90],[50,78],[100,50],[150,28],[200,15],[250,30],[300,55],[350,48],[400,45]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3.5" fill="white" />
                ))}
                {[[0,70],[50,77],[100,75],[150,68],[200,65],[250,62],[300,50],[350,52],[400,60]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="2.5" fill="white" opacity="0.3" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;

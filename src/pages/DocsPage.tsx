import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Store, Users, MessageSquare, Sparkles, DollarSign, Settings } from "lucide-react";
import { useState } from "react";

const sections = [
  { icon: BookOpen, title: "Getting Started", content: "Welcome to EventNest! To get started:\n\n1. **Create an account** — Sign up for free at eventnest.com/signup\n2. **Set up your profile** — Add your name, photo, and organization details\n3. **Create your first event** — Head to Dashboard → Events → Create Event\n4. **Invite your team** — Add collaborators from the Team page\n5. **Explore vendors** — Browse our marketplace to find the perfect vendors" },
  { icon: Calendar, title: "Events", content: "Events are the core of EventNest. Each event includes:\n\n- **Details**: Name, date, time, location, guest count\n- **Category**: Wedding, Corporate, Conference, Social, etc.\n- **Budget**: Set and track budgets per category\n- **Timeline**: Create milestones and track progress\n- **Tasks**: Assign tasks to team members\n- **Vendors**: Link vendors to specific events" },
  { icon: Store, title: "Vendor Marketplace", content: "Our vendor marketplace connects you with verified professionals:\n\n- **Search & Filter**: Find vendors by category, location, price range\n- **Profiles**: View portfolios, reviews, and ratings\n- **Contact**: Message vendors directly through the platform\n- **Favorites**: Save vendors for quick access later\n- **Booking**: Request quotes and manage contracts" },
  { icon: Users, title: "Team Management", content: "Collaborate effectively with your team:\n\n- **Invite Members**: Send email invitations to join your team\n- **Roles & Permissions**: Admin, Editor, Viewer access levels\n- **Event Assignment**: Assign team members to specific events\n- **Communication**: Message team members directly\n- **Activity Tracking**: See who did what and when" },
  { icon: MessageSquare, title: "Messaging", content: "Stay connected with everyone involved:\n\n- **Direct Messages**: One-on-one conversations\n- **Team Chats**: Group discussions per event\n- **Vendor Messages**: Communicate with vendors\n- **Status Indicators**: Sent, delivered, and read receipts\n- **Attachments**: Share files, images, and documents" },
  { icon: Sparkles, title: "AI Assistant", content: "Your intelligent event planning companion:\n\n- **Event Planning**: Generate complete event plans with timelines\n- **Budget Optimization**: Get suggestions to maximize your budget\n- **Vendor Recommendations**: AI-curated vendor suggestions\n- **Task Generation**: Auto-create task lists for your events\n- **Analytics**: Insights from your event data" },
  { icon: DollarSign, title: "Budget & Billing", content: "Manage finances with precision:\n\n- **Budget Allocation**: Set budgets per event and category\n- **Expense Tracking**: Log expenses in real-time\n- **Alerts**: Get notified before budget overruns\n- **Reports**: Export detailed financial reports\n- **Billing**: Manage your EventNest subscription" },
  { icon: Settings, title: "Settings & Configuration", content: "Customize your EventNest experience:\n\n- **Profile Settings**: Update your personal information\n- **Notification Preferences**: Choose how you want to be notified\n- **Security**: Password management and 2FA\n- **Billing**: Manage your plan and payment methods\n- **Integrations**: Connect with external tools" },
];

const DocsPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: '#0B0B0F' }}>
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h2 className="text-lg font-bold text-white mb-4">Documentation</h2>
            <nav className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active === i ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={active === i ? { background: 'rgba(59,130,246,0.15)' } : {}}
                >
                  <s.icon className="h-4 w-4 flex-shrink-0" />
                  {s.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl p-8" style={{
              background: 'linear-gradient(135deg, #16161D 0%, #121218 100%)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                {(() => { const Icon = sections[active].icon; return <Icon className="h-6 w-6 text-blue-400" />; })()}
                <h1 className="text-2xl font-bold text-white">{sections[active].title}</h1>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                {sections[active].content.split('\n').map((line, i) => {
                  if (line.startsWith('- **')) {
                    const parts = line.replace('- **', '').split('**:');
                    return <p key={i} className="ml-4 mb-1 text-sm" style={{ color: '#d1d5db' }}>• <strong className="text-white">{parts[0]}</strong>:{parts[1]}</p>;
                  }
                  if (line.match(/^\d\./)) {
                    const parts = line.replace(/^\d\.\s\*\*/, '').split('**');
                    return <p key={i} className="ml-4 mb-1 text-sm" style={{ color: '#d1d5db' }}>{line.charAt(0)}. <strong className="text-white">{parts[0]}</strong>{parts[1]}</p>;
                  }
                  if (line === '') return <br key={i} />;
                  return <p key={i} className="text-sm mb-2" style={{ color: '#d1d5db' }}>{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocsPage;

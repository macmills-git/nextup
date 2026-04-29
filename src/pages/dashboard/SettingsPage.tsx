import { useState } from "react";
import { User, Bell, Lock, CreditCard, Mail, Palette, Globe, Info, Plus, CheckCircle, Save, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const tabs = ["Profile", "Password", "Billings", "Plan", "Email", "Notifications"];

const billingHistory = [
  { invoice: "Account Sale", date: "Apr 14, 2026", amount: "$3,050", status: "Pending", statusColor: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400", tracking: "TR-20264142" },
  { invoice: "Account Sale", date: "Jun 24, 2026", amount: "$1,050", status: "Cancelled", statusColor: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400", tracking: "TR-20264241" },
  { invoice: "Pro Subscription", date: "Feb 28, 2026", amount: "$800", status: "Refund", statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", tracking: "TR-20262801" },
  { invoice: "Vendor Booking", date: "Jan 15, 2026", amount: "$2,400", status: "Completed", statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", tracking: "TR-20261501" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Profile state
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [profileEmail, setProfileEmail] = useState("jane@nested.com");
  const [phone, setPhone] = useState("+1 555-0201");
  const [bio, setBio] = useState("Event planning professional with 8+ years of experience.");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification state
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);
  const [eventReminders, setEventReminders] = useState(true);
  const [vendorUpdates, setVendorUpdates] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  // Billing state
  const [contactEmail, setContactEmail] = useState("existing");
  const [cardName, setCardName] = useState("Jane Doe");
  const [cardNumber, setCardNumber] = useState("8269 9620 9292 2538");
  const [cardExpiry, setCardExpiry] = useState("02 / 2028");
  const [cardCvv, setCardCvv] = useState("1234");

  // Email preferences
  const [emailDigest, setEmailDigest] = useState("daily");
  const [emailLanguage, setEmailLanguage] = useState("en");

  // Team
  const [teamMembers] = useState([
    { name: "Jane Doe", email: "jane@nested.com", role: "Admin", status: "Active" },
    { name: "Michael Chen", email: "michael@nested.com", role: "Coordinator", status: "Active" },
    { name: "Sarah Williams", email: "sarah@nested.com", role: "Viewer", status: "Active" },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleSave = (section: string) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Changes saved", description: `Your ${section} settings have been updated successfully.` });
    }, 600);
  };

  const SaveButton = ({ section }: { section: string }) => (
    <button disabled={saving} onClick={() => handleSave(section)}
      className="px-5 py-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-1.5 disabled:opacity-70">
      {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex gap-1 p-0.5 bg-muted rounded-lg overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${activeTab === tab ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Profile" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">JD</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{firstName} {lastName}</h3>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>
            <button className="ml-auto px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">Change Photo</button>
          </div>
          <div className="border-t border-border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground">First Name</label><Input className="mt-1.5" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Last Name</label><Input className="mt-1.5" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Email</label><Input className="mt-1.5" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} type="email" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Phone</label><Input className="mt-1.5" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground">Bio</label>
              <textarea className="w-full mt-1.5 p-3 rounded-lg border border-border bg-background text-sm text-foreground resize-none min-h-[80px] outline-none focus:ring-2 focus:ring-primary/20" value={bio} onChange={e => setBio(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end"><SaveButton section="profile" /></div>
        </div>
      )}

      {activeTab === "Password" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Security Settings</h3>
          <div className="space-y-4 max-w-md">
            <div><label className="text-xs font-medium text-muted-foreground">Current Password</label><Input className="mt-1.5" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">New Password</label><Input className="mt-1.5" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Confirm Password</label><Input className="mt-1.5" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" /></div>
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}
          </div>
          <div className="flex justify-end">
            <button disabled={!currentPassword || !newPassword || newPassword !== confirmPassword} onClick={() => { handleSave("password"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}
              className="px-5 py-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50">Update Password</button>
          </div>
          <div className="border-t border-border pt-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={(v) => { setTwoFactorEnabled(v); toast({ title: v ? "2FA Enabled" : "2FA Disabled" }); }} />
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Notification Preferences</h3>
          {[
            { label: "Email Notifications", desc: "Receive event updates via email", checked: emailNotif, set: setEmailNotif },
            { label: "Push Notifications", desc: "Real-time alerts in browser", checked: pushNotif, set: setPushNotif },
            { label: "Event Reminders", desc: "Get reminded before event deadlines", checked: eventReminders, set: setEventReminders },
            { label: "Vendor Updates", desc: "Notifications when vendors respond", checked: vendorUpdates, set: setVendorUpdates },
            { label: "Budget Alerts", desc: "Alerts when spending exceeds 80%", checked: budgetAlerts, set: setBudgetAlerts },
            { label: "Marketing Emails", desc: "Tips, features, and promotions", checked: marketingNotif, set: setMarketingNotif },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={item.checked} onCheckedChange={(v) => { item.set(v); toast({ title: `${item.label} ${v ? 'enabled' : 'disabled'}` }); }} />
              </div>
              {i < 5 && <div className="border-t border-border mt-4" />}
            </div>
          ))}
        </div>
      )}

      {activeTab === "Billings" && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Payment Method</h3>
                <p className="text-xs text-muted-foreground">Update your billing details and address.</p>
              </div>
            </div>
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                <div>
                  <p className="text-sm font-medium text-foreground">Card Details</p>
                  <p className="text-xs text-muted-foreground mt-1">Update your billing details.</p>
                  <button className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-2">
                    <Plus className="w-3.5 h-3.5" /> Add another card
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-muted-foreground">Name on Card</label><Input className="mt-1.5" value={cardName} onChange={e => setCardName(e.target.value)} /></div>
                  <div><label className="text-xs font-medium text-muted-foreground">Expiry</label><Input className="mt-1.5" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} /></div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Card Number</label>
                    <div className="relative mt-1.5">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                    </div>
                  </div>
                  <div><label className="text-xs font-medium text-muted-foreground">CVV</label><Input className="mt-1.5" type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value)} /></div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6"><SaveButton section="billing" /></div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground text-sm">Contact email</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">When should invoices be sent?</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="contactEmail" checked={contactEmail === "existing"} onChange={() => setContactEmail("existing")} className="w-4 h-4 accent-primary" />
                <div>
                  <p className="text-sm text-foreground">Send to the existing email</p>
                  <p className="text-xs text-muted-foreground">{profileEmail}</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="contactEmail" checked={contactEmail === "another"} onChange={() => setContactEmail("another")} className="w-4 h-4 accent-primary" />
                <p className="text-sm text-foreground">Add another email address</p>
              </label>
              {contactEmail === "another" && (
                <Input placeholder="billing@company.com" className="max-w-sm mt-2" />
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground text-sm">Billing History</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">See the transactions you made</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{item.invoice}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.date}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{item.amount}</td>
                      <td className="py-3 px-4"><span className={`px-2.5 py-1 rounded-md text-xs font-medium ${item.statusColor}`}>{item.status}</span></td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{item.tracking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Plan" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Current Plan</h3>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">Pro Plan</p>
                <p className="text-xs text-muted-foreground">$29/month • Renews Mar 15, 2026</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Active</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Starter", price: "$0", features: ["3 events/month", "Basic templates", "Email support"], current: false },
              { name: "Pro", price: "$29", features: ["Unlimited events", "All templates", "AI Assistant", "Priority support", "Reports"], current: true },
              { name: "Enterprise", price: "$99", features: ["Everything in Pro", "Custom integrations", "Dedicated manager", "SLA guarantee", "Advanced analytics"], current: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl border p-5 ${plan.current ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <h4 className="font-semibold text-foreground">{plan.name}</h4>
                <p className="text-2xl font-bold text-foreground mt-1">{plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                <div className="space-y-2 mt-4">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-primary" /> {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-4 py-2 rounded-lg text-xs font-medium ${plan.current ? 'bg-primary text-white' : 'border border-border text-foreground hover:bg-muted'}`}>
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


      {activeTab === "Email" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Email Preferences</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email Digest Frequency</label>
              <div className="flex gap-2 mt-2">
                {["daily", "weekly", "monthly", "never"].map(freq => (
                  <button key={freq} onClick={() => setEmailDigest(freq)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${emailDigest === freq ? 'bg-primary text-white' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
                    {freq}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email Language</label>
              <select value={emailLanguage} onChange={e => setEmailLanguage(e.target.value)}
                className="w-full mt-1.5 h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end"><SaveButton section="email" /></div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

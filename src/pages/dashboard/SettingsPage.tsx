import { useState } from "react";
import { User, Bell, Lock, CreditCard, Mail, Palette, Globe, Info, Plus, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const tabs = ["My details", "Profile", "Password", "Team", "Billings", "Plan", "Email", "Notifications"];

const billingHistory = [
  { invoice: "Account Sale", date: "Apr 14, 2026", amount: "$3,050", status: "Pending", statusColor: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400", tracking: "TR-20264142" },
  { invoice: "Account Sale", date: "Jun 24, 2026", amount: "$1,050", status: "Cancelled", statusColor: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400", tracking: "TR-20264241" },
  { invoice: "Pro Subscription", date: "Feb 28, 2026", amount: "$800", status: "Refund", statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", tracking: "TR-20262801" },
  { invoice: "Vendor Booking", date: "Jan 15, 2026", amount: "$2,400", status: "Completed", statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", tracking: "TR-20261501" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Billings");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);
  const [contactEmail, setContactEmail] = useState("existing");

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

      {(activeTab === "My details" || activeTab === "Profile") && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-background font-semibold text-lg">JD</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Jane Doe</h3>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>
            <button className="ml-auto px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">Change Photo</button>
          </div>
          <div className="border-t border-border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground">First Name</label><Input className="mt-1.5" defaultValue="Jane" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Last Name</label><Input className="mt-1.5" defaultValue="Doe" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Email</label><Input className="mt-1.5" defaultValue="jane@eventnest.com" type="email" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Phone</label><Input className="mt-1.5" defaultValue="+1 555-0201" /></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground">Bio</label><Input className="mt-1.5" defaultValue="Event planning professional with 8+ years of experience." /></div>
          </div>
          <div className="flex justify-end">
            <button className="px-5 py-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "Password" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Security Settings</h3>
          <div className="space-y-4 max-w-md">
            <div><label className="text-xs font-medium text-muted-foreground">Current Password</label><Input className="mt-1.5" type="password" placeholder="••••••••" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">New Password</label><Input className="mt-1.5" type="password" placeholder="••••••••" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Confirm Password</label><Input className="mt-1.5" type="password" placeholder="••••••••" /></div>
          </div>
          <div className="flex justify-end">
            <button className="px-5 py-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">Update Password</button>
          </div>
          <div className="border-t border-border pt-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground">Enable 2FA</button>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Notification Preferences</h3>
          {[
            { label: "Email Notifications", desc: "Receive event updates via email", checked: emailNotif, set: setEmailNotif },
            { label: "Push Notifications", desc: "Real-time alerts in browser", checked: pushNotif, set: setPushNotif },
            { label: "Marketing Emails", desc: "Tips, features, and promotions", checked: marketingNotif, set: setMarketingNotif },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={item.checked} onCheckedChange={item.set} />
              </div>
              {i < 2 && <div className="border-t border-border mt-4" />}
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
                  <div><label className="text-xs font-medium text-muted-foreground">Name on Card</label><Input className="mt-1.5" defaultValue="Jane Doe" /></div>
                  <div><label className="text-xs font-medium text-muted-foreground">Expiry</label><Input className="mt-1.5" defaultValue="02 / 2028" /></div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Card Number</label>
                    <div className="relative mt-1.5">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" defaultValue="8269 9620 9292 2538" />
                    </div>
                  </div>
                  <div><label className="text-xs font-medium text-muted-foreground">CVV</label><Input className="mt-1.5" type="password" defaultValue="1234" /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground text-sm">Contact email</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">When should invoices be sent?</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="contactEmail" checked={contactEmail === "existing"} onChange={() => setContactEmail("existing")} className="w-4 h-4 accent-primary" />
                <div>
                  <p className="text-sm text-foreground">Send to the existing email</p>
                  <p className="text-xs text-muted-foreground">jane@eventnest.com</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="contactEmail" checked={contactEmail === "another"} onChange={() => setContactEmail("another")} className="w-4 h-4 accent-primary" />
                <p className="text-sm text-foreground">Add another email address</p>
              </label>
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
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">Pro Plan</p>
                <p className="text-xs text-muted-foreground">$29/month • Renews Mar 15, 2026</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground">Manage Plan</button>
            </div>
          </div>
        </div>
      )}

      {(activeTab === "Team" || activeTab === "Email") && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground text-sm mb-4">{activeTab} Settings</h3>
          <p className="text-sm text-muted-foreground">Configure your {activeTab.toLowerCase()} preferences here.</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

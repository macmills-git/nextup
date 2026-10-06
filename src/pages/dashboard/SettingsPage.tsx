import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const tabs = ["Profile", "Password"];

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
        <h1 className="text-xl font-normal text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex gap-1 p-0.5 bg-muted rounded-lg overflow-x-auto w-fit">
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
              <h3 className="font-normal text-foreground text-sm">{firstName} {lastName}</h3>
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
          <h3 className="font-normal text-foreground text-sm">Security Settings</h3>
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
    </div>
  );
};

export default SettingsPage;

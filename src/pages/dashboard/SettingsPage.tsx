import { useState } from "react";
import { User, Bell, Lock, Palette, Globe, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">JD</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Jane Doe</h3>
                <p className="text-sm text-muted-foreground">Project Manager</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">Change Photo</Button>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Jane" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="jane@eventnest.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+1 555-0201" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Bio</Label>
                <Input defaultValue="Event planning professional with 8+ years of experience." />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="gradient-primary text-primary-foreground">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
            <h3 className="font-semibold text-foreground">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive event updates via email</p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Real-time alerts in browser</p>
                </div>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Tips, features, and promotions</p>
                </div>
                <Switch checked={marketingNotif} onCheckedChange={setMarketingNotif} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
            <h3 className="font-semibold text-foreground">Security Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="gradient-primary text-primary-foreground">Update Password</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
            <h3 className="font-semibold text-foreground">Billing & Plan</h3>
            <div className="p-4 rounded-lg bg-accent border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">$29/month • Renews Mar 15, 2026</p>
                </div>
                <Button variant="outline" size="sm">Manage Plan</Button>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm">Payment Method</h4>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">•••• •••• •••• 4242</span>
                </div>
                <Button variant="ghost" size="sm">Update</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;

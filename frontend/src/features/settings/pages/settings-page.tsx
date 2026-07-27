import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  User, 
  Bell, 
  Shield, 
  Globe,
  Database,
  Key,
  Save
} from "lucide-react"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@ocp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+212 600 123 456" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Warehouse Operations" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Warehouse Manager" />
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Email Notifications", description: "Receive notifications via email" },
                { title: "Low Stock Alerts", description: "Get notified when products are below minimum stock" },
                { title: "Request Approvals", description: "Notifications for stock request approvals" },
                { title: "Movement Updates", description: "Updates on stock movements" },
                { title: "System Updates", description: "Important system announcements" },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium">{setting.title}</p>
                    <p className="text-sm text-slate-500">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-slate-500">Secure your account with two-factor authentication</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select 
                  id="language" 
                  className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone" 
                  className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm"
                >
                  <option value="Africa/Casablanca">Africa/Casablanca (GMT+1)</option>
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <select 
                  id="dateFormat" 
                  className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure API endpoints and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiUrl">API Base URL</Label>
                <Input id="apiUrl" defaultValue="http://localhost:8000/api" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiTimeout">Request Timeout (seconds)</Label>
                <Input id="apiTimeout" type="number" defaultValue="30" />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

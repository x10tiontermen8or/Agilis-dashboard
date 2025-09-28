// 📂 app/settings/page.tsx

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Theme</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" onClick={() => setTheme('light')}>Light</Button>
                <Button variant="outline" onClick={() => setTheme('dark')}>Dark</Button>
                <Button variant="outline" onClick={() => setTheme('system')}>System</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Desktop Notifications</Label>
              <Switch id="desktop-notifications" disabled />
            </div>
             <div className="flex items-center justify-between">
              <Label>Incident Alerts Only</Label>
              <Switch id="incident-alerts" />
            </div>
          </CardContent>
          <CardFooter>
             <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
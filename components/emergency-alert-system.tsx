"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, Car, Ambulance, Shield, MapPin, Clock, Plus, Eye, CheckCircle } from "lucide-react"

interface EmergencyAlert {
  id: number
  type: "accident" | "congestion" | "emergency-vehicle" | "road-closure" | "weather" | "maintenance"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  location: string
  coordinates?: { lat: number; lng: number }
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  assignedTo?: string
  estimatedDuration?: string
  affectedRoutes: string[]
  autoDetected: boolean
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: 1,
    type: "accident",
    severity: "high",
    title: "Multi-vehicle collision",
    description: "Three-car accident blocking two lanes. Emergency services on scene.",
    location: "Main St & 5th Ave",
    coordinates: { lat: 40.7128, lng: -74.006 },
    timestamp: "2 min ago",
    status: "active",
    assignedTo: "Officer Johnson",
    estimatedDuration: "45 min",
    affectedRoutes: ["Route 1", "Route 5"],
    autoDetected: true,
  },
  {
    id: 2,
    type: "congestion",
    severity: "medium",
    title: "Heavy traffic congestion",
    description: "Unusual traffic buildup detected. Queue length exceeding normal parameters.",
    location: "Highway 101 North",
    timestamp: "5 min ago",
    status: "acknowledged",
    estimatedDuration: "20 min",
    affectedRoutes: ["Highway 101"],
    autoDetected: true,
  },
  {
    id: 3,
    type: "emergency-vehicle",
    severity: "critical",
    title: "Emergency vehicle priority",
    description: "Ambulance requesting priority route clearance.",
    location: "Broadway & 2nd St",
    timestamp: "1 min ago",
    status: "active",
    estimatedDuration: "5 min",
    affectedRoutes: ["Broadway", "Main St"],
    autoDetected: true,
  },
  {
    id: 4,
    type: "road-closure",
    severity: "high",
    title: "Planned road closure",
    description: "Construction work blocking eastbound lanes.",
    location: "Park Ave & 3rd St",
    timestamp: "15 min ago",
    status: "active",
    assignedTo: "Traffic Control",
    estimatedDuration: "2 hours",
    affectedRoutes: ["Park Ave"],
    autoDetected: false,
  },
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case "accident":
      return Car
    case "emergency-vehicle":
      return Ambulance
    case "road-closure":
      return Shield
    case "congestion":
      return AlertTriangle
    default:
      return AlertTriangle
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "text-blue-600 bg-blue-100"
    case "medium":
      return "text-yellow-600 bg-yellow-100"
    case "high":
      return "text-orange-600 bg-orange-100"
    case "critical":
      return "text-red-600 bg-red-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "destructive"
    case "acknowledged":
      return "outline"
    case "resolved":
      return "secondary"
    default:
      return "secondary"
  }
}

export function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [newAlert, setNewAlert] = useState<Partial<EmergencyAlert>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new alert occasionally
      if (Math.random() < 0.1) {
        const newAlertData: EmergencyAlert = {
          id: Date.now(),
          type: "congestion",
          severity: "medium",
          title: "Traffic buildup detected",
          description: "Automated system detected unusual traffic patterns.",
          location: `Junction ${Math.floor(Math.random() * 10) + 1}`,
          timestamp: "Just now",
          status: "active",
          estimatedDuration: "15 min",
          affectedRoutes: [`Route ${Math.floor(Math.random() * 5) + 1}`],
          autoDetected: true,
        }
        setAlerts((prev) => [newAlertData, ...prev])

        if (soundEnabled) {
          // In a real app, you'd play an alert sound here
          console.log("🔔 New alert sound")
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [soundEnabled])

  const acknowledgeAlert = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const resolveAlert = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const createAlert = () => {
    if (newAlert.title && newAlert.location && newAlert.type && newAlert.severity) {
      const alert: EmergencyAlert = {
        id: Date.now(),
        type: newAlert.type as any,
        severity: newAlert.severity as any,
        title: newAlert.title,
        description: newAlert.description || "",
        location: newAlert.location,
        timestamp: "Just now",
        status: "active",
        estimatedDuration: newAlert.estimatedDuration,
        affectedRoutes: newAlert.affectedRoutes || [],
        autoDetected: false,
      }
      setAlerts((prev) => [alert, ...prev])
      setNewAlert({})
      setIsCreateDialogOpen(false)
    }
  }

  const activeAlerts = alerts.filter((a) => a.status === "active")
  const acknowledgedAlerts = alerts.filter((a) => a.status === "acknowledged")
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved")

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-bold text-yellow-600">{acknowledgedAlerts.length}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Detected</p>
                <p className="text-2xl font-bold">{alerts.filter((a) => a.autoDetected).length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alert Management
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                <Bell className={`w-4 h-4 mr-2 ${soundEnabled ? "text-blue-600" : "text-gray-400"}`} />
                Sound {soundEnabled ? "On" : "Off"}
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Manual Alert</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Alert Type</label>
                        <Select onValueChange={(value) => setNewAlert((prev) => ({ ...prev, type: value as any }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accident">Accident</SelectItem>
                            <SelectItem value="congestion">Congestion</SelectItem>
                            <SelectItem value="road-closure">Road Closure</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="weather">Weather</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Severity</label>
                        <Select onValueChange={(value) => setNewAlert((prev) => ({ ...prev, severity: value as any }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Alert title"
                        value={newAlert.title || ""}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        placeholder="Location or intersection"
                        value={newAlert.location || ""}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Detailed description"
                        value={newAlert.description || ""}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estimated Duration</label>
                      <Input
                        placeholder="e.g., 30 min, 2 hours"
                        value={newAlert.estimatedDuration || ""}
                        onChange={(e) => setNewAlert((prev) => ({ ...prev, estimatedDuration: e.target.value }))}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createAlert}>Create Alert</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Alert Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active
            {activeAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {activeAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            Acknowledged
            {acknowledgedAlerts.length > 0 && (
              <Badge variant="outline" className="ml-2 h-5 w-5 p-0 text-xs">
                {acknowledgedAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <p className="text-muted-foreground">No active alerts</p>
              </CardContent>
            </Card>
          ) : (
            activeAlerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type)
              return (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant={getStatusVariant(alert.status)}>{alert.severity}</Badge>
                            {alert.autoDetected && (
                              <Badge variant="outline" className="text-xs">
                                Auto-detected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {alert.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {alert.timestamp}
                            </span>
                            {alert.estimatedDuration && <span>Duration: {alert.estimatedDuration}</span>}
                          </div>
                          {alert.affectedRoutes.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {alert.affectedRoutes.map((route) => (
                                <Badge key={route} variant="secondary" className="text-xs">
                                  {route}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Acknowledge
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => resolveAlert(alert.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="acknowledged" className="space-y-4">
          {acknowledgedAlerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type)
            return (
              <Card key={alert.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge variant="outline">{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => resolveAlert(alert.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type)
            return (
              <Card key={alert.id} className="border-l-4 border-l-green-500 opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-600">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <Badge variant="secondary">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

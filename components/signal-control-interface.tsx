"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Settings, AlertTriangle, CheckCircle, Timer } from "lucide-react"

interface Junction {
  id: number
  name: string
  location: string
  currentPhase: "green-ns" | "yellow-ns" | "red-ns" | "green-ew" | "yellow-ew" | "red-ew"
  autoMode: boolean
  cycleTime: number
  greenTime: { ns: number; ew: number }
  queueLength: { ns: number; ew: number; total: number }
  waitTime: number
  lastOverride: string | null
  status: "normal" | "override" | "maintenance" | "emergency"
}

const mockJunctions: Junction[] = [
  {
    id: 1,
    name: "Junction Alpha",
    location: "Main St & 1st Ave",
    currentPhase: "green-ns",
    autoMode: true,
    cycleTime: 120,
    greenTime: { ns: 45, ew: 35 },
    queueLength: { ns: 8, ew: 12, total: 20 },
    waitTime: 2.3,
    lastOverride: null,
    status: "normal",
  },
  {
    id: 2,
    name: "Junction Beta",
    location: "Broadway & 2nd St",
    currentPhase: "red-ns",
    autoMode: false,
    cycleTime: 90,
    greenTime: { ns: 30, ew: 40 },
    queueLength: { ns: 15, ew: 8, total: 23 },
    waitTime: 4.1,
    lastOverride: "5 min ago",
    status: "override",
  },
  {
    id: 3,
    name: "Junction Gamma",
    location: "Park Ave & 3rd St",
    currentPhase: "yellow-ew",
    autoMode: true,
    cycleTime: 100,
    greenTime: { ns: 40, ew: 35 },
    queueLength: { ns: 6, ew: 18, total: 24 },
    waitTime: 5.2,
    lastOverride: null,
    status: "emergency",
  },
  {
    id: 4,
    name: "Junction Delta",
    location: "Oak St & 4th Ave",
    currentPhase: "green-ew",
    autoMode: true,
    cycleTime: 110,
    greenTime: { ns: 35, ew: 45 },
    queueLength: { ns: 10, ew: 5, total: 15 },
    waitTime: 1.8,
    lastOverride: null,
    status: "normal",
  },
]

const getPhaseColor = (phase: string) => {
  if (phase.includes("green")) return "bg-green-500"
  if (phase.includes("yellow")) return "bg-yellow-500"
  if (phase.includes("red")) return "bg-red-500"
  return "bg-gray-300"
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "normal":
      return "secondary"
    case "override":
      return "outline"
    case "emergency":
      return "destructive"
    case "maintenance":
      return "secondary"
    default:
      return "secondary"
  }
}

export function SignalControlInterface() {
  const [junctions, setJunctions] = useState<Junction[]>(mockJunctions)
  const [selectedJunction, setSelectedJunction] = useState<Junction | null>(null)
  const [emergencyMode, setEmergencyMode] = useState(false)

  const toggleAutoMode = (junctionId: number) => {
    setJunctions((prev) =>
      prev.map((j) =>
        j.id === junctionId ? { ...j, autoMode: !j.autoMode, status: j.autoMode ? "override" : "normal" } : j,
      ),
    )
  }

  const overrideSignal = (junctionId: number, phase: string) => {
    setJunctions((prev) =>
      prev.map((j) =>
        j.id === junctionId
          ? {
              ...j,
              currentPhase: phase as any,
              autoMode: false,
              status: "override",
              lastOverride: "Just now",
            }
          : j,
      ),
    )
  }

  const updateTiming = (junctionId: number, direction: "ns" | "ew", value: number) => {
    setJunctions((prev) =>
      prev.map((j) =>
        j.id === junctionId
          ? {
              ...j,
              greenTime: { ...j.greenTime, [direction]: value },
            }
          : j,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Emergency Controls */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Emergency Controls
            </div>
            <Switch checked={emergencyMode} onCheckedChange={setEmergencyMode} />
          </CardTitle>
        </CardHeader>
        {emergencyMode && (
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Emergency mode activated. All signals will prioritize emergency vehicle routes.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2 mt-4">
              <Button variant="destructive" size="sm">
                Clear All Intersections
              </Button>
              <Button variant="outline" size="sm">
                Emergency Route Priority
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Junction Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {junctions.map((junction) => (
          <Card key={junction.id} className={`${junction.status === "emergency" ? "border-red-300" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{junction.name}</p>
                    <p className="text-sm text-muted-foreground">{junction.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(junction.status)}>{junction.status}</Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedJunction(junction)}>
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{junction.name} - Advanced Controls</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Cycle Time (seconds)</label>
                          <Slider
                            value={[junction.cycleTime]}
                            onValueChange={(value) => {
                              setJunctions((prev) =>
                                prev.map((j) => (j.id === junction.id ? { ...j, cycleTime: value[0] } : j)),
                              )
                            }}
                            max={180}
                            min={60}
                            step={10}
                          />
                          <p className="text-xs text-muted-foreground">{junction.cycleTime}s</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">North-South Green Time</label>
                          <Slider
                            value={[junction.greenTime.ns]}
                            onValueChange={(value) => updateTiming(junction.id, "ns", value[0])}
                            max={60}
                            min={15}
                            step={5}
                          />
                          <p className="text-xs text-muted-foreground">{junction.greenTime.ns}s</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">East-West Green Time</label>
                          <Slider
                            value={[junction.greenTime.ew]}
                            onValueChange={(value) => updateTiming(junction.id, "ew", value[0])}
                            max={60}
                            min={15}
                            step={5}
                          />
                          <p className="text-xs text-muted-foreground">{junction.greenTime.ew}s</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority Mode</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal Operation</SelectItem>
                              <SelectItem value="pedestrian">Pedestrian Priority</SelectItem>
                              <SelectItem value="transit">Transit Priority</SelectItem>
                              <SelectItem value="emergency">Emergency Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Signal State Visualization */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium">North-South</p>
                  <div className="flex gap-1">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "green-ns" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "yellow-ns" ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "red-ns" ? "bg-red-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">East-West</p>
                  <div className="flex gap-1">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "green-ew" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "yellow-ew" ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${
                        junction.currentPhase === "red-ew" ? "bg-red-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Traffic Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Queue</p>
                  <p className="font-semibold">{junction.queueLength.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Wait Time</p>
                  <p className="font-semibold">{junction.waitTime}min</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Cycle</p>
                  <p className="font-semibold">{junction.cycleTime}s</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={junction.autoMode} onCheckedChange={() => toggleAutoMode(junction.id)} />
                  <span className="text-sm">Auto Mode</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => overrideSignal(junction.id, "green-ns")}
                    disabled={junction.autoMode}
                  >
                    NS Green
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => overrideSignal(junction.id, "green-ew")}
                    disabled={junction.autoMode}
                  >
                    EW Green
                  </Button>
                </div>
              </div>

              {/* Override Status */}
              {junction.lastOverride && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="w-3 h-3" />
                  <span>Last override: {junction.lastOverride}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Active Junctions</p>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Auto Mode</p>
              <p className="text-2xl font-bold">{junctions.filter((j) => j.autoMode).length}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Overrides</p>
              <p className="text-2xl font-bold text-yellow-600">
                {junctions.filter((j) => j.status === "override").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Emergencies</p>
              <p className="text-2xl font-bold text-red-600">
                {junctions.filter((j) => j.status === "emergency").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

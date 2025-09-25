"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Car, BarChart3, Activity, AlertCircle, CheckCircle } from "lucide-react"

// Mock data for charts
const trafficFlowData = [
  { time: "06:00", vehicles: 120, avgSpeed: 45 },
  { time: "07:00", vehicles: 280, avgSpeed: 35 },
  { time: "08:00", vehicles: 450, avgSpeed: 25 },
  { time: "09:00", vehicles: 380, avgSpeed: 40 },
  { time: "10:00", vehicles: 220, avgSpeed: 50 },
  { time: "11:00", vehicles: 180, avgSpeed: 55 },
  { time: "12:00", vehicles: 320, avgSpeed: 42 },
  { time: "13:00", vehicles: 290, avgSpeed: 38 },
  { time: "14:00", vehicles: 200, avgSpeed: 48 },
  { time: "15:00", vehicles: 160, avgSpeed: 52 },
]

const congestionData = [
  { junction: "Alpha", congestion: 85, incidents: 2 },
  { junction: "Beta", congestion: 92, incidents: 4 },
  { junction: "Gamma", congestion: 67, incidents: 1 },
  { junction: "Delta", congestion: 78, incidents: 3 },
  { junction: "Echo", congestion: 45, incidents: 0 },
]

const signalEfficiencyData = [
  { name: "Optimal", value: 65, color: "#22c55e" },
  { name: "Good", value: 25, color: "#eab308" },
  { name: "Poor", value: 10, color: "#ef4444" },
]

const weeklyTrendData = [
  { day: "Mon", efficiency: 78, incidents: 12, avgWait: 3.2 },
  { day: "Tue", efficiency: 82, incidents: 8, avgWait: 2.8 },
  { day: "Wed", efficiency: 75, incidents: 15, avgWait: 3.6 },
  { day: "Thu", efficiency: 88, incidents: 6, avgWait: 2.4 },
  { day: "Fri", efficiency: 71, incidents: 18, avgWait: 4.1 },
  { day: "Sat", efficiency: 85, incidents: 9, avgWait: 2.9 },
  { day: "Sun", efficiency: 89, incidents: 5, avgWait: 2.2 },
]

export function TrafficAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Efficiency</p>
                <p className="text-2xl font-bold">87.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5.2%</span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Incidents</p>
                <p className="text-2xl font-bold">3</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">-2 from yesterday</span>
                </div>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">2.8min</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">-0.4min</span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Hour Load</p>
                <p className="text-2xl font-bold">92%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs text-yellow-600">High</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="traffic-flow" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic-flow">Traffic Flow</TabsTrigger>
          <TabsTrigger value="congestion">Congestion</TabsTrigger>
          <TabsTrigger value="efficiency">Signal Efficiency</TabsTrigger>
          <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic-flow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Real-time Traffic Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="vehicles"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                      name="Vehicle Count"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgSpeed"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Avg Speed (mph)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="congestion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Junction Congestion Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {congestionData.map((junction) => (
                  <div key={junction.junction} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Junction {junction.junction}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            junction.incidents > 2 ? "destructive" : junction.incidents > 0 ? "outline" : "secondary"
                          }
                        >
                          {junction.incidents} incidents
                        </Badge>
                        <span className="text-sm font-medium">{junction.congestion}%</span>
                      </div>
                    </div>
                    <Progress value={junction.congestion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Signal Timing Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={signalEfficiencyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {signalEfficiencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {signalEfficiencyData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Wait Time</span>
                    <span className="font-medium">3.2 min</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Queue Length Optimization</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Signal Coordination</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Emergency Response</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name="Efficiency %"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="incidents"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Incidents"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgWait"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Avg Wait (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"
import { TrendingUp, TrendingDown, Target, Award, Clock, BarChart3, Download, RefreshCw } from "lucide-react"

// Mock performance data
const performanceMetrics = {
  overall: {
    efficiency: 87.2,
    improvement: 12.5,
    avgResponseTime: 2.8,
    incidentReduction: 23.4,
    fuelSavings: 15.7,
    co2Reduction: 18.3,
  },
  kpis: [
    { name: "System Uptime", value: 99.8, target: 99.5, status: "excellent" },
    { name: "Signal Optimization", value: 92.1, target: 90.0, status: "excellent" },
    { name: "Emergency Response", value: 78.5, target: 85.0, status: "needs-improvement" },
    { name: "Traffic Flow", value: 85.3, target: 80.0, status: "good" },
    { name: "Queue Management", value: 88.7, target: 85.0, status: "excellent" },
    { name: "Incident Detection", value: 94.2, target: 90.0, status: "excellent" },
  ],
}

const monthlyPerformance = [
  { month: "Jan", efficiency: 78, incidents: 45, avgWait: 4.2, fuelSaved: 12.3 },
  { month: "Feb", efficiency: 81, incidents: 38, avgWait: 3.8, fuelSaved: 13.1 },
  { month: "Mar", efficiency: 83, incidents: 42, avgWait: 3.6, fuelSaved: 14.2 },
  { month: "Apr", efficiency: 85, incidents: 35, avgWait: 3.4, fuelSaved: 14.8 },
  { month: "May", efficiency: 87, incidents: 31, avgWait: 3.2, fuelSaved: 15.5 },
  { month: "Jun", efficiency: 89, incidents: 28, avgWait: 2.9, fuelSaved: 16.2 },
]

const hourlyEfficiency = [
  { hour: "00:00", efficiency: 95, load: 15 },
  { hour: "02:00", efficiency: 97, load: 8 },
  { hour: "04:00", efficiency: 96, load: 12 },
  { hour: "06:00", efficiency: 85, load: 45 },
  { hour: "08:00", efficiency: 72, load: 85 },
  { hour: "10:00", efficiency: 88, load: 65 },
  { hour: "12:00", efficiency: 82, load: 75 },
  { hour: "14:00", efficiency: 86, load: 70 },
  { hour: "16:00", efficiency: 68, load: 92 },
  { hour: "18:00", efficiency: 71, load: 88 },
  { hour: "20:00", efficiency: 89, load: 55 },
  { hour: "22:00", efficiency: 93, load: 35 },
]

const junctionPerformance = [
  { name: "Junction Alpha", efficiency: 92, incidents: 2, avgWait: 2.1, improvement: 8.5 },
  { name: "Junction Beta", efficiency: 78, incidents: 8, avgWait: 4.2, improvement: -2.3 },
  { name: "Junction Gamma", efficiency: 85, incidents: 4, avgWait: 3.1, improvement: 12.1 },
  { name: "Junction Delta", efficiency: 91, incidents: 1, avgWait: 2.3, improvement: 15.7 },
  { name: "Junction Echo", efficiency: 88, incidents: 3, avgWait: 2.8, improvement: 6.9 },
]

const environmentalImpact = [
  { name: "CO2 Reduction", value: 18.3, color: "#22c55e" },
  { name: "Fuel Savings", value: 15.7, color: "#3b82f6" },
  { name: "Noise Reduction", value: 12.4, color: "#8b5cf6" },
  { name: "Air Quality", value: 21.2, color: "#f59e0b" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "text-green-600 bg-green-100"
    case "good":
      return "text-blue-600 bg-blue-100"
    case "needs-improvement":
      return "text-yellow-600 bg-yellow-100"
    case "poor":
      return "text-red-600 bg-red-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("efficiency")

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Efficiency</p>
                <p className="text-2xl font-bold text-green-600">{performanceMetrics.overall.efficiency}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{performanceMetrics.overall.improvement}%</span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-blue-600">{performanceMetrics.overall.avgResponseTime}min</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">-0.8min</span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incident Reduction</p>
                <p className="text-2xl font-bold text-purple-600">{performanceMetrics.overall.incidentReduction}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">vs last period</span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Analytics
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24hours">24 Hours</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="kpis">Key Metrics</TabsTrigger>
          <TabsTrigger value="junctions">Junction Analysis</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
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

            <Card>
              <CardHeader>
                <CardTitle>24-Hour Efficiency Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyEfficiency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                        name="Efficiency %"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="load"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name="Traffic Load %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.kpis.map((kpi) => (
              <Card key={kpi.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{kpi.name}</h3>
                    <Badge className={getStatusColor(kpi.status)}>{kpi.status.replace("-", " ")}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {kpi.value}%</span>
                      <span>Target: {kpi.target}%</span>
                    </div>
                    <Progress value={kpi.value} className="h-3" />
                    <div className="flex items-center gap-1 text-sm">
                      {kpi.value >= kpi.target ? (
                        <>
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-green-600">+{(kpi.value - kpi.target).toFixed(1)}% above target</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3 text-red-600" />
                          <span className="text-red-600">{(kpi.target - kpi.value).toFixed(1)}% below target</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="junctions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Junction Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={junctionPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="hsl(var(--chart-1))" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {junctionPerformance.map((junction) => (
                  <div key={junction.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{junction.name}</p>
                        <p className="text-sm text-muted-foreground">{junction.incidents} incidents this month</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-semibold">{junction.efficiency}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Avg Wait</p>
                        <p className="font-semibold">{junction.avgWait}min</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Improvement</p>
                        <p className={`font-semibold ${junction.improvement > 0 ? "text-green-600" : "text-red-600"}`}>
                          {junction.improvement > 0 ? "+" : ""}
                          {junction.improvement}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={environmentalImpact}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {environmentalImpact.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.value}% improvement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sustainability Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CO2 Emissions Reduced</span>
                    <span className="font-medium">2,847 tons/year</span>
                  </div>
                  <Progress value={73} className="h-2" />
                  <p className="text-xs text-muted-foreground">73% of annual target achieved</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Fuel Consumption Saved</span>
                    <span className="font-medium">1.2M gallons/year</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-muted-foreground">68% of annual target achieved</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Economic Impact</span>
                    <span className="font-medium">$4.2M saved</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <p className="text-xs text-muted-foreground">84% of projected savings</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Air Quality Index</span>
                    <span className="font-medium">+21% improvement</span>
                  </div>
                  <Progress value={91} className="h-2" />
                  <p className="text-xs text-muted-foreground">Excellent air quality rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Environmental Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="fuelSaved"
                      stroke="hsl(var(--chart-4))"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.3}
                      name="Fuel Saved (K gallons)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

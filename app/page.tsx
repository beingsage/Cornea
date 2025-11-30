"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArchitectureVisualization } from "@/components/architecture-visualization"
import { MLModelShowcase } from "@/components/ml-model-showcase"
import { PipelineVisualization } from "@/components/pipeline-visualization"
import { KnowledgeHierarchy } from "@/components/knowledge-hierarchy"
import {
  Brain,
  Network,
  Database,
  Activity,
  Users,
  Settings,
  BarChart3,
  Zap,
  Shield,
  GitBranch,
  Cpu,
  Eye,
  Target,
  Layers,
  Workflow,
} from "lucide-react"

export default function CognitiveKnowledgeSystem() {
  const [activeView, setActiveView] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">TacitEcho</h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                Enterprise v2.1
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                Architecture
              </Button>
              <Button variant="ghost" size="sm">
                Models
              </Button>
              <Button variant="ghost" size="sm">
                Analytics
              </Button>
              <Button variant="ghost" size="sm">
                Settings
              </Button>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
                <span>System Active</span>
              </div>
              <Button size="sm">Deploy</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-card">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              ML Models
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Networks
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Metrics
            </TabsTrigger>
          </TabsList>

          {/* Overview Dashboard */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Models</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">547</div>
                  <p className="text-xs text-muted-foreground">+23 from last deployment</p>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Knowledge Nodes</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">1.2M</div>
                  <p className="text-xs text-muted-foreground">Across 7 organizational layers</p>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">98.7%</div>
                  <p className="text-xs text-muted-foreground">Real-time efficiency</p>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">A+</div>
                  <p className="text-xs text-muted-foreground">Privacy-first architecture</p>
                </CardContent>
              </Card>
            </div>

            {/* System Architecture Overview */}
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  System Architecture Layers
                </CardTitle>
                <CardDescription>7-layer cognitive processing architecture with real-time data flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                  {[
                    { name: "Data Collection", icon: Eye, status: "active", processes: 1247 },
                    { name: "Representation", icon: GitBranch, status: "active", processes: 892 },
                    { name: "Learning", icon: Brain, status: "active", processes: 634 },
                    { name: "Reasoning", icon: Target, status: "active", processes: 445 },
                    { name: "Memory", icon: Database, status: "active", processes: 1156 },
                    { name: "Control & Sim", icon: Settings, status: "active", processes: 223 },
                    { name: "Evaluation", icon: BarChart3, status: "active", processes: 334 },
                  ].map((layer, index) => (
                    <Card key={index} className="relative overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <layer.icon className="h-6 w-6 text-primary" />
                          <h3 className="font-semibold text-sm">{layer.name}</h3>
                          <div className="text-xs text-muted-foreground">{layer.processes} processes</div>
                          <div className="w-full bg-secondary rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full data-flow"
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Executive Dashboard Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Organizational Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Knowledge Capture Rate</span>
                      <span className="text-sm font-semibold text-primary">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cross-team Collaboration</span>
                      <span className="text-sm font-semibold text-accent">87.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Policy Compliance</span>
                      <span className="text-sm font-semibold text-chart-3">99.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Decision Automation</span>
                      <span className="text-sm font-semibold text-chart-4">76.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-time Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edge Agents Active</span>
                      <Badge variant="secondary">1,247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Streams</span>
                      <Badge variant="secondary">89</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ML Inference/sec</span>
                      <Badge variant="secondary">15.2K</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Knowledge Updates</span>
                      <Badge variant="secondary">342</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="architecture">
            <ArchitectureVisualization />
          </TabsContent>

          <TabsContent value="models">
            <MLModelShowcase />
          </TabsContent>

          <TabsContent value="pipeline">
            <PipelineVisualization />
          </TabsContent>

          {/* Knowledge Hierarchy component */}
          <TabsContent value="knowledge">
            <KnowledgeHierarchy />
          </TabsContent>

          <TabsContent value="network">
            <KnowledgeHierarchy />
          </TabsContent>

          {/* Placeholder content for metrics tab */}
          <TabsContent value="metrics">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
                <CardDescription>Advanced analytics and performance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Activity className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-muted-foreground">Metrics dashboard will be implemented in the next milestone</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

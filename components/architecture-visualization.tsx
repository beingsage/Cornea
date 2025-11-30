"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  GitBranch,
  Brain,
  Target,
  Database,
  Settings,
  BarChart3,
  Activity,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowDown,
} from "lucide-react"

interface ArchitectureLayer {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  processes: number
  throughput: number
  latency: number
  accuracy: number
  status: "active" | "warning" | "error"
  components: string[]
  dataFlow: {
    input: string
    output: string
    volume: number
  }
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: "data-collection",
    name: "Data Collection Layer",
    description: "Sensor telemetry, system traces, event segmentation with live data flow animation",
    icon: Eye,
    processes: 1247,
    throughput: 15.2,
    latency: 12,
    accuracy: 99.1,
    status: "active",
    components: ["Edge Agents", "System Observers", "Event Collectors", "PII Redaction"],
    dataFlow: {
      input: "Raw Events",
      output: "Structured Data",
      volume: 2.4,
    },
  },
  {
    id: "representation",
    name: "Representation Layer",
    description: "Embeddings visualization, knowledge graph nodes, feature fusion processes",
    icon: GitBranch,
    processes: 892,
    throughput: 12.8,
    latency: 18,
    accuracy: 97.3,
    status: "active",
    components: ["Embedding Models", "Feature Extractors", "Semantic Encoders", "Graph Builders"],
    dataFlow: {
      input: "Structured Data",
      output: "Vector Embeddings",
      volume: 1.8,
    },
  },
  {
    id: "learning",
    name: "Learning Layer",
    description: "Behavioral cloning, inverse RL, meta-learning modules, continual learning systems",
    icon: Brain,
    processes: 634,
    throughput: 8.9,
    latency: 45,
    accuracy: 94.7,
    status: "active",
    components: ["Behavioral Cloning", "Inverse RL", "Meta-Learning", "Continual Learning"],
    dataFlow: {
      input: "Vector Embeddings",
      output: "Learned Patterns",
      volume: 1.2,
    },
  },
  {
    id: "reasoning",
    name: "Reasoning Layer",
    description: "Symbolic generalization, rule extraction, procedural graph construction",
    icon: Target,
    processes: 445,
    throughput: 6.7,
    latency: 67,
    accuracy: 92.1,
    status: "warning",
    components: ["Rule Extraction", "Symbolic Reasoning", "Causal Inference", "Logic Engines"],
    dataFlow: {
      input: "Learned Patterns",
      output: "Rules & Logic",
      volume: 0.9,
    },
  },
  {
    id: "memory",
    name: "Memory Layer",
    description: "Episodic database, example banks, versioned knowledge stores",
    icon: Database,
    processes: 1156,
    throughput: 22.1,
    latency: 8,
    accuracy: 99.8,
    status: "active",
    components: ["Episodic Memory", "Semantic Memory", "Working Memory", "Knowledge Graphs"],
    dataFlow: {
      input: "Rules & Logic",
      output: "Stored Knowledge",
      volume: 3.1,
    },
  },
  {
    id: "control-simulation",
    name: "Control & Simulation Layer",
    description: "Shadow mode operations, simulation engines, policy distillation",
    icon: Settings,
    processes: 223,
    throughput: 4.3,
    latency: 89,
    accuracy: 96.4,
    status: "active",
    components: ["Shadow Mode", "Digital Twins", "Policy Engines", "Simulation Runtime"],
    dataFlow: {
      input: "Stored Knowledge",
      output: "Control Policies",
      volume: 0.6,
    },
  },
  {
    id: "evaluation",
    name: "Evaluation Layer",
    description: "Uncertainty estimation, validation algorithms, privacy backlash mitigation",
    icon: BarChart3,
    processes: 334,
    throughput: 7.8,
    latency: 34,
    accuracy: 98.2,
    status: "active",
    components: ["Uncertainty Estimation", "Validation Engines", "Privacy Audits", "Quality Metrics"],
    dataFlow: {
      input: "Control Policies",
      output: "Validated Outputs",
      volume: 0.8,
    },
  },
]

export function ArchitectureVisualization() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % architectureLayers.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "error":
        return AlertTriangle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-8">
      {/* Architecture Overview */}
      <Card className="gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            7-Layer Cognitive Processing Architecture
          </CardTitle>
          <CardDescription>
            Real-time visualization of data flow through organizational cognitive layers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 relative">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon
              const StatusIcon = getStatusIcon(layer.status)
              const isActive = animationPhase === index
              const isSelected = selectedLayer === layer.id

              return (
                <div key={layer.id} className="relative">
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isActive ? "ring-2 ring-primary shadow-lg" : ""
                    } ${isSelected ? "ring-2 ring-accent" : ""}`}
                    onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative">
                          <Icon className={`h-8 w-8 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                          <StatusIcon className={`h-3 w-3 absolute -top-1 -right-1 ${getStatusColor(layer.status)}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm mb-1">{layer.name}</h3>
                          <div className="text-xs text-muted-foreground mb-2">{layer.processes} processes</div>
                          <div className="text-xs text-primary font-mono">{layer.throughput}K/sec</div>
                        </div>
                        <div className="w-full space-y-1">
                          <Progress value={layer.accuracy} className="h-1" />
                          <div className="text-xs text-muted-foreground">{layer.accuracy}% accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Data Flow Arrow */}
                  {index < architectureLayers.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight
                        className={`h-4 w-4 ${
                          animationPhase === index ? "text-primary animate-pulse" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  )}

                  {/* Mobile Flow Arrow */}
                  {index < architectureLayers.length - 1 && (
                    <div className="lg:hidden flex justify-center py-2">
                      <ArrowDown
                        className={`h-4 w-4 ${
                          animationPhase === index ? "text-primary animate-pulse" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Layer Information */}
      {selectedLayer && (
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const layer = architectureLayers.find((l) => l.id === selectedLayer)
                if (!layer) return null
                const Icon = layer.icon
                return (
                  <>
                    <Icon className="h-5 w-5" />
                    {layer.name} - Detailed View
                  </>
                )
              })()}
            </CardTitle>
            <CardDescription>{architectureLayers.find((l) => l.id === selectedLayer)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const layer = architectureLayers.find((l) => l.id === selectedLayer)
              if (!layer) return null

              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Throughput</span>
                        <Badge variant="secondary">{layer.throughput}K/sec</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Latency</span>
                        <Badge variant="secondary">{layer.latency}ms</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accuracy</span>
                        <Badge variant="secondary">{layer.accuracy}%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Processes</span>
                        <Badge variant="secondary">{layer.processes}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Components */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Core Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {layer.components.map((component, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{component}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Data Flow */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Data Flow</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Input</div>
                        <div className="text-sm font-medium">{layer.dataFlow.input}</div>
                      </div>
                      <div className="flex justify-center">
                        <ArrowDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Processing Volume</div>
                        <div className="text-sm font-medium">{layer.dataFlow.volume}GB/min</div>
                      </div>
                      <div className="flex justify-center">
                        <ArrowDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Output</div>
                        <div className="text-sm font-medium">{layer.dataFlow.output}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* System Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" />
              Processing Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">94.7%</div>
            <Progress value={94.7} className="mb-2" />
            <p className="text-xs text-muted-foreground">Across all 7 layers</p>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Security Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400 mb-2">99.8%</div>
            <Progress value={99.8} className="mb-2" />
            <p className="text-xs text-muted-foreground">Privacy-first architecture</p>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent mb-2">99.99%</div>
            <Progress value={99.99} className="mb-2" />
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

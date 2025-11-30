"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  Database,
  Shield,
  FileText,
  Zap,
  Search,
  Brain,
  GitBranch,
  BarChart3,
  Activity,
  Eye,
  Settings,
  Users,
  Lock,
} from "lucide-react"

interface PipelineStage {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  status: "completed" | "processing" | "queued" | "error"
  progress: number
  throughput: number
  latency: number
  errorRate: number
  details: {
    input: string
    output: string
    processes: string[]
    metrics: {
      [key: string]: string | number
    }
  }
}

const pipelineStages: PipelineStage[] = [
  {
    id: "ingest-validate",
    name: "Ingest & Validate",
    description: "Schema validation, deduplication, and data quality checks",
    icon: Database,
    status: "completed",
    progress: 100,
    throughput: 15200,
    latency: 12,
    errorRate: 0.2,
    details: {
      input: "Raw Data Streams",
      output: "Validated Records",
      processes: ["Schema Validation", "Duplicate Detection", "Quality Scoring", "Format Verification"],
      metrics: {
        "Records Processed": "1.2M",
        "Validation Success": "99.8%",
        "Duplicates Removed": "2.3K",
        "Quality Score": 94.7,
      },
    },
  },
  {
    id: "pii-redaction",
    name: "PII Redaction",
    description: "Privacy compliance and sensitive data protection",
    icon: Shield,
    status: "processing",
    progress: 78,
    throughput: 12800,
    latency: 18,
    errorRate: 0.1,
    details: {
      input: "Validated Records",
      output: "Privacy-Safe Data",
      processes: ["PII Detection", "Anonymization", "Compliance Check", "Audit Logging"],
      metrics: {
        "PII Instances Found": "45.2K",
        "Redaction Success": "99.9%",
        "Compliance Score": "A+",
        "False Positives": "0.1%",
      },
    },
  },
  {
    id: "modality-preprocessing",
    name: "Modality Preprocessing",
    description: "Format conversion and multimodal data preparation",
    icon: FileText,
    status: "processing",
    progress: 65,
    throughput: 9600,
    latency: 34,
    errorRate: 0.3,
    details: {
      input: "Privacy-Safe Data",
      output: "Normalized Formats",
      processes: ["PDF Parsing", "OCR Processing", "Speech-to-Text", "Image Analysis"],
      metrics: {
        "Documents Processed": "234K",
        "OCR Accuracy": "97.2%",
        "Audio Transcribed": "12.4 hrs",
        "Images Analyzed": "89.3K",
      },
    },
  },
  {
    id: "normalization",
    name: "Normalization",
    description: "Field mapping and data standardization",
    icon: Settings,
    status: "queued",
    progress: 0,
    throughput: 8400,
    latency: 28,
    errorRate: 0.4,
    details: {
      input: "Normalized Formats",
      output: "Standardized Schema",
      processes: ["Field Mapping", "Type Conversion", "Unit Standardization", "Encoding Normalization"],
      metrics: {
        "Fields Mapped": "0",
        "Conversion Success": "0%",
        "Standards Applied": "0",
        "Encoding Issues": "0",
      },
    },
  },
  {
    id: "embedding-generation",
    name: "Embedding Generation",
    description: "Vector representations using multiple model architectures",
    icon: Brain,
    status: "queued",
    progress: 0,
    throughput: 7200,
    latency: 45,
    errorRate: 0.2,
    details: {
      input: "Standardized Schema",
      output: "Vector Embeddings",
      processes: ["Text Embeddings", "Image Embeddings", "Multimodal Fusion", "Dimensionality Reduction"],
      metrics: {
        "Embeddings Generated": "0",
        "Vector Dimensions": "768",
        "Similarity Accuracy": "0%",
        "Compression Ratio": "0x",
      },
    },
  },
  {
    id: "event-segmentation",
    name: "Event Segmentation",
    description: "Episode detection and temporal boundary identification",
    icon: GitBranch,
    status: "queued",
    progress: 0,
    throughput: 6800,
    latency: 52,
    errorRate: 0.5,
    details: {
      input: "Vector Embeddings",
      output: "Segmented Episodes",
      processes: ["Temporal Analysis", "Boundary Detection", "Episode Clustering", "Context Preservation"],
      metrics: {
        "Episodes Detected": "0",
        "Boundary Accuracy": "0%",
        "Avg Episode Length": "0 min",
        "Context Overlap": "0%",
      },
    },
  },
  {
    id: "semantic-classification",
    name: "Semantic Classification",
    description: "Tag assignment and content categorization",
    icon: Search,
    status: "queued",
    progress: 0,
    throughput: 5900,
    latency: 38,
    errorRate: 0.3,
    details: {
      input: "Segmented Episodes",
      output: "Classified Content",
      processes: ["Topic Modeling", "Intent Classification", "Entity Recognition", "Sentiment Analysis"],
      metrics: {
        "Topics Identified": "0",
        "Classification Accuracy": "0%",
        "Entities Extracted": "0",
        "Sentiment Score": "0",
      },
    },
  },
  {
    id: "knowledge-extraction",
    name: "Knowledge Extraction",
    description: "Triple extraction and relationship identification",
    icon: Eye,
    status: "queued",
    progress: 0,
    throughput: 4200,
    latency: 67,
    errorRate: 0.6,
    details: {
      input: "Classified Content",
      output: "Knowledge Triples",
      processes: ["Relation Extraction", "Entity Linking", "Fact Verification", "Confidence Scoring"],
      metrics: {
        "Triples Extracted": "0",
        "Relation Types": "0",
        "Fact Accuracy": "0%",
        "Confidence Avg": "0%",
      },
    },
  },
  {
    id: "summarization",
    name: "Summarization",
    description: "Content compression and key insight extraction",
    icon: BarChart3,
    status: "queued",
    progress: 0,
    throughput: 3800,
    latency: 89,
    errorRate: 0.4,
    details: {
      input: "Knowledge Triples",
      output: "Summarized Insights",
      processes: ["Abstractive Summary", "Key Point Extraction", "Insight Ranking", "Quality Assessment"],
      metrics: {
        "Summaries Generated": "0",
        "Compression Ratio": "0:1",
        "Key Points": "0",
        "Quality Score": "0%",
      },
    },
  },
  {
    id: "indexing-storage",
    name: "Indexing & Storage",
    description: "Database optimization and retrieval preparation",
    icon: Database,
    status: "queued",
    progress: 0,
    throughput: 11200,
    latency: 15,
    errorRate: 0.1,
    details: {
      input: "Summarized Insights",
      output: "Indexed Knowledge",
      processes: ["Vector Indexing", "Graph Storage", "Search Optimization", "Backup Creation"],
      metrics: {
        "Records Indexed": "0",
        "Index Size": "0 GB",
        "Query Performance": "0 ms",
        "Storage Efficiency": "0%",
      },
    },
  },
  {
    id: "hierarchical-classification",
    name: "Hierarchical Classification",
    description: "Taxonomy mapping and knowledge level assignment",
    icon: Zap,
    status: "queued",
    progress: 0,
    throughput: 2900,
    latency: 124,
    errorRate: 0.7,
    details: {
      input: "Indexed Knowledge",
      output: "Hierarchical Structure",
      processes: ["Level Assignment", "Taxonomy Mapping", "Authority Scoring", "Promotion Rules"],
      metrics: {
        "Knowledge Levels": "0",
        "Taxonomy Nodes": "0",
        "Authority Score": "0%",
        Promotions: "0",
      },
    },
  },
  {
    id: "feedback-loop",
    name: "Feedback Loop",
    description: "Human validation and continuous improvement",
    icon: Users,
    status: "queued",
    progress: 0,
    throughput: 1800,
    latency: 156,
    errorRate: 0.2,
    details: {
      input: "Hierarchical Structure",
      output: "Validated Knowledge",
      processes: ["Human Review", "Feedback Integration", "Model Updates", "Quality Metrics"],
      metrics: {
        "Reviews Completed": "0",
        "Feedback Score": "0%",
        "Model Updates": "0",
        "Quality Improvement": "0%",
      },
    },
  },
  {
    id: "audit-governance",
    name: "Audit & Governance",
    description: "Compliance verification and governance controls",
    icon: Lock,
    status: "queued",
    progress: 0,
    throughput: 2400,
    latency: 78,
    errorRate: 0.1,
    details: {
      input: "Validated Knowledge",
      output: "Compliant Output",
      processes: ["Compliance Check", "Audit Trail", "Access Control", "Version Management"],
      metrics: {
        "Compliance Score": "0%",
        "Audit Events": "0",
        "Access Grants": "0",
        "Versions Tracked": "0",
      },
    },
  },
]

export function PipelineVisualization() {
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % pipelineStages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [isPlaying])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "processing":
        return "text-blue-400"
      case "queued":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "processing":
        return Activity
      case "queued":
        return Clock
      case "error":
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "queued":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-8">
      {/* Pipeline Overview */}
      <Card className="gradient-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                13-Stage Data Processing Pipeline
              </CardTitle>
              <CardDescription>Real-time visualization of organizational data flow and processing</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Badge variant="secondary">Live</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-13 gap-2 relative">
            {pipelineStages.map((stage, index) => {
              const Icon = stage.icon
              const StatusIcon = getStatusIcon(stage.status)
              const isActive = animationPhase === index
              const isSelected = selectedStage?.id === stage.id

              return (
                <div key={stage.id} className="relative">
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isActive ? "ring-2 ring-primary shadow-lg" : ""
                    } ${isSelected ? "ring-2 ring-accent" : ""} ${
                      stage.status === "processing" ? "animate-pulse" : ""
                    }`}
                    onClick={() => setSelectedStage(isSelected ? null : stage)}
                  >
                    <CardContent className="p-3">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="relative">
                          <Icon className={`h-6 w-6 ${isActive ? "text-primary" : getStatusColor(stage.status)}`} />
                          <StatusIcon className={`h-3 w-3 absolute -top-1 -right-1 ${getStatusColor(stage.status)}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xs mb-1">{stage.name}</h3>
                          <div className="text-xs text-muted-foreground mb-1">{stage.throughput}/sec</div>
                          <div className="text-xs text-muted-foreground">{stage.latency}ms</div>
                        </div>
                        <div className="w-full space-y-1">
                          <Progress value={stage.progress} className="h-1" />
                          <div className="text-xs text-muted-foreground">{stage.progress}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Flow Arrow */}
                  {index < pipelineStages.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-1 transform -translate-y-1/2 z-10">
                      <ArrowRight
                        className={`h-3 w-3 ${
                          animationPhase === index ? "text-primary animate-pulse" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  )}

                  {/* Mobile Flow Arrow */}
                  {index < pipelineStages.length - 1 && (
                    <div className="lg:hidden flex justify-center py-1">
                      <ArrowDown
                        className={`h-3 w-3 ${
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

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Throughput</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(pipelineStages.reduce((acc, stage) => acc + stage.throughput, 0) / 1000)}K/sec
                </p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Latency</p>
                <p className="text-2xl font-bold text-accent">
                  {Math.round(pipelineStages.reduce((acc, stage) => acc + stage.latency, 0) / pipelineStages.length)}ms
                </p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold text-green-400">
                  {(
                    (pipelineStages.reduce((acc, stage) => acc + stage.errorRate, 0) / pipelineStages.length) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stages Active</p>
                <p className="text-2xl font-bold text-chart-3">
                  {pipelineStages.filter((s) => s.status === "processing" || s.status === "completed").length}/
                  {pipelineStages.length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stage Information */}
      {selectedStage && (
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <selectedStage.icon className="h-6 w-6" />
              {selectedStage.name} - Detailed View
            </CardTitle>
            <CardDescription>{selectedStage.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status</span>
                    <Badge variant={getStatusBadgeVariant(selectedStage.status)}>{selectedStage.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progress</span>
                    <Badge variant="secondary">{selectedStage.progress}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Throughput</span>
                    <Badge variant="secondary">{selectedStage.throughput}/sec</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Latency</span>
                    <Badge variant="secondary">{selectedStage.latency}ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <Badge variant="secondary">{selectedStage.errorRate}%</Badge>
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
                    <div className="text-sm font-medium">{selectedStage.details.input}</div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Processes</div>
                    <div className="space-y-1">
                      {selectedStage.details.processes.map((process, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          <span className="text-xs">{process}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Output</div>
                    <div className="text-sm font-medium">{selectedStage.details.output}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Stage Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Stage Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(selectedStage.details.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm">{key}</span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Processing Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Processing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineStages.slice(0, 6).map((stage) => (
                <div key={stage.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(stage.status).replace("text-", "bg-")}`} />
                    <span className="text-sm">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={stage.progress} className="w-16 h-1" />
                    <span className="text-xs text-muted-foreground w-8">{stage.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Queue Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineStages.slice(6).map((stage) => (
                <div key={stage.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(stage.status).replace("text-", "bg-")}`} />
                    <span className="text-sm">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {stage.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

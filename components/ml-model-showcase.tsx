"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Eye,
  FileText,
  BarChart3,
  Network,
  Zap,
  Activity,
  Search,
  TrendingUp,
  ImageIcon,
  MessageSquare,
  GitBranch,
  Target,
  Shield,
  Layers,
} from "lucide-react"

interface MLModel {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  accuracy: number
  latency: number
  throughput: number
  memoryUsage: number
  status: "active" | "training" | "deployed" | "deprecated"
  version: string
  lastUpdated: string
  parameters: string
  framework: string
  useCase: string
  icon: React.ComponentType<any>
}

const mlModels: MLModel[] = [
  // Text Processing Models
  {
    id: "bert-base",
    name: "BERT Base",
    category: "Text Processing",
    subcategory: "Language Understanding",
    description: "Bidirectional encoder representations from transformers for document understanding",
    accuracy: 94.2,
    latency: 45,
    throughput: 1200,
    memoryUsage: 512,
    status: "active",
    version: "v2.1",
    lastUpdated: "2024-01-15",
    parameters: "110M",
    framework: "PyTorch",
    useCase: "Document Classification",
    icon: FileText,
  },
  {
    id: "roberta-large",
    name: "RoBERTa Large",
    category: "Text Processing",
    subcategory: "Language Understanding",
    description: "Robustly optimized BERT pretraining approach for enhanced text comprehension",
    accuracy: 96.1,
    latency: 78,
    throughput: 800,
    memoryUsage: 1024,
    status: "active",
    version: "v1.8",
    lastUpdated: "2024-01-12",
    parameters: "355M",
    framework: "PyTorch",
    useCase: "Sentiment Analysis",
    icon: MessageSquare,
  },
  {
    id: "sentence-bert",
    name: "Sentence-BERT",
    category: "Text Processing",
    subcategory: "Embeddings",
    description: "Sentence embeddings using siamese BERT networks for semantic similarity",
    accuracy: 92.8,
    latency: 32,
    throughput: 1800,
    memoryUsage: 256,
    status: "active",
    version: "v2.0",
    lastUpdated: "2024-01-18",
    parameters: "110M",
    framework: "PyTorch",
    useCase: "Semantic Search",
    icon: Search,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    category: "Text Processing",
    subcategory: "Generation",
    description: "Generative pre-trained transformer for text generation and completion",
    accuracy: 89.5,
    latency: 120,
    throughput: 600,
    memoryUsage: 2048,
    status: "active",
    version: "v1.5",
    lastUpdated: "2024-01-20",
    parameters: "175B",
    framework: "Custom",
    useCase: "Content Generation",
    icon: Brain,
  },
  {
    id: "t5-base",
    name: "T5 Base",
    category: "Text Processing",
    subcategory: "Summarization",
    description: "Text-to-text transfer transformer for summarization and translation tasks",
    accuracy: 91.3,
    latency: 65,
    throughput: 900,
    memoryUsage: 768,
    status: "active",
    version: "v1.1",
    lastUpdated: "2024-01-14",
    parameters: "220M",
    framework: "TensorFlow",
    useCase: "Document Summarization",
    icon: FileText,
  },

  // Computer Vision Models
  {
    id: "clip-vit-b32",
    name: "CLIP ViT-B/32",
    category: "Computer Vision",
    subcategory: "Multimodal",
    description: "Contrastive language-image pre-training for multimodal understanding",
    accuracy: 88.7,
    latency: 55,
    throughput: 1100,
    memoryUsage: 512,
    status: "active",
    version: "v1.0",
    lastUpdated: "2024-01-16",
    parameters: "151M",
    framework: "PyTorch",
    useCase: "Image-Text Matching",
    icon: ImageIcon,
  },
  {
    id: "vit-large",
    name: "Vision Transformer Large",
    category: "Computer Vision",
    subcategory: "Classification",
    description: "Vision transformer for image classification with attention mechanisms",
    accuracy: 93.4,
    latency: 42,
    throughput: 1400,
    memoryUsage: 1024,
    status: "active",
    version: "v2.2",
    lastUpdated: "2024-01-19",
    parameters: "307M",
    framework: "PyTorch",
    useCase: "Image Classification",
    icon: Eye,
  },
  {
    id: "layoutlm-v3",
    name: "LayoutLM v3",
    category: "Computer Vision",
    subcategory: "Document Analysis",
    description: "Pre-trained multimodal transformer for document layout analysis",
    accuracy: 95.1,
    latency: 89,
    throughput: 700,
    memoryUsage: 896,
    status: "active",
    version: "v3.0",
    lastUpdated: "2024-01-13",
    parameters: "125M",
    framework: "PyTorch",
    useCase: "Document Understanding",
    icon: FileText,
  },
  {
    id: "yolo-v8",
    name: "YOLO v8",
    category: "Computer Vision",
    subcategory: "Object Detection",
    description: "You only look once object detection with improved accuracy and speed",
    accuracy: 91.8,
    latency: 28,
    throughput: 2100,
    memoryUsage: 384,
    status: "active",
    version: "v8.0",
    lastUpdated: "2024-01-21",
    parameters: "43M",
    framework: "PyTorch",
    useCase: "Real-time Detection",
    icon: Target,
  },

  // Time Series & Anomaly Detection
  {
    id: "prophet",
    name: "Prophet",
    category: "Time Series",
    subcategory: "Forecasting",
    description: "Forecasting procedure for time series data with strong seasonal effects",
    accuracy: 87.2,
    latency: 156,
    throughput: 450,
    memoryUsage: 128,
    status: "active",
    version: "v1.1",
    lastUpdated: "2024-01-17",
    parameters: "N/A",
    framework: "Python",
    useCase: "Business Forecasting",
    icon: TrendingUp,
  },
  {
    id: "lstm-anomaly",
    name: "LSTM Anomaly Detector",
    category: "Time Series",
    subcategory: "Anomaly Detection",
    description: "Long short-term memory networks for sequence anomaly detection",
    accuracy: 89.6,
    latency: 73,
    throughput: 850,
    memoryUsage: 256,
    status: "active",
    version: "v2.3",
    lastUpdated: "2024-01-11",
    parameters: "2.1M",
    framework: "TensorFlow",
    useCase: "System Monitoring",
    icon: Activity,
  },
  {
    id: "isolation-forest",
    name: "Isolation Forest",
    category: "Time Series",
    subcategory: "Anomaly Detection",
    description: "Unsupervised anomaly detection using isolation-based approach",
    accuracy: 85.4,
    latency: 34,
    throughput: 1600,
    memoryUsage: 64,
    status: "active",
    version: "v1.2",
    lastUpdated: "2024-01-09",
    parameters: "N/A",
    framework: "Scikit-learn",
    useCase: "Outlier Detection",
    icon: Shield,
  },

  // Graph & Network Models
  {
    id: "gnn-sage",
    name: "GraphSAGE",
    category: "Graph Networks",
    subcategory: "Node Classification",
    description: "Graph neural network for inductive representation learning on large graphs",
    accuracy: 92.1,
    latency: 67,
    throughput: 950,
    memoryUsage: 512,
    status: "active",
    version: "v2.0",
    lastUpdated: "2024-01-22",
    parameters: "1.8M",
    framework: "PyTorch Geometric",
    useCase: "Social Network Analysis",
    icon: Network,
  },
  {
    id: "pagerank",
    name: "PageRank",
    category: "Graph Networks",
    subcategory: "Centrality",
    description: "Link analysis algorithm for measuring importance of network nodes",
    accuracy: 94.7,
    latency: 245,
    throughput: 320,
    memoryUsage: 128,
    status: "active",
    version: "v1.0",
    lastUpdated: "2024-01-08",
    parameters: "N/A",
    framework: "NetworkX",
    useCase: "Influence Mapping",
    icon: GitBranch,
  },

  // Reinforcement Learning
  {
    id: "behavioral-cloning",
    name: "Behavioral Cloning",
    category: "Reinforcement Learning",
    subcategory: "Imitation Learning",
    description: "Learning policies from expert demonstrations through supervised learning",
    accuracy: 88.3,
    latency: 98,
    throughput: 650,
    memoryUsage: 384,
    status: "training",
    version: "v1.4",
    lastUpdated: "2024-01-23",
    parameters: "5.2M",
    framework: "PyTorch",
    useCase: "Expert Imitation",
    icon: Brain,
  },
  {
    id: "inverse-rl",
    name: "Inverse RL",
    category: "Reinforcement Learning",
    subcategory: "Reward Learning",
    description: "Learning reward functions from observed behavior patterns",
    accuracy: 86.9,
    latency: 134,
    throughput: 480,
    memoryUsage: 768,
    status: "training",
    version: "v2.1",
    lastUpdated: "2024-01-24",
    parameters: "8.7M",
    framework: "PyTorch",
    useCase: "Preference Learning",
    icon: Target,
  },
]

// Generate additional models to reach 500+
const generateAdditionalModels = (): MLModel[] => {
  const categories = ["Text Processing", "Computer Vision", "Time Series", "Graph Networks", "Reinforcement Learning"]
  const subcategories = {
    "Text Processing": ["Language Understanding", "Generation", "Embeddings", "Summarization"],
    "Computer Vision": ["Classification", "Detection", "Segmentation", "Multimodal"],
    "Time Series": ["Forecasting", "Anomaly Detection", "Classification"],
    "Graph Networks": ["Node Classification", "Link Prediction", "Centrality"],
    "Reinforcement Learning": ["Policy Learning", "Value Functions", "Multi-Agent"],
  }
  const frameworks = ["PyTorch", "TensorFlow", "JAX", "Scikit-learn", "Custom"]
  const icons = [Brain, Eye, FileText, BarChart3, Network, Zap, Activity, Target, Shield, Layers]

  const additionalModels: MLModel[] = []

  for (let i = 0; i < 485; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const subcategory = subcategories[category][Math.floor(Math.random() * subcategories[category].length)]
    const framework = frameworks[Math.floor(Math.random() * frameworks.length)]
    const icon = icons[Math.floor(Math.random() * icons.length)]

    additionalModels.push({
      id: `model-${i + 16}`,
      name: `${category.split(" ")[0]} Model ${i + 16}`,
      category,
      subcategory,
      description: `Advanced ${subcategory.toLowerCase()} model for ${category.toLowerCase()} tasks`,
      accuracy: Math.round((Math.random() * 15 + 80) * 10) / 10,
      latency: Math.round(Math.random() * 200 + 20),
      throughput: Math.round(Math.random() * 2000 + 300),
      memoryUsage: Math.round(Math.random() * 1500 + 64),
      status: ["active", "training", "deployed"][Math.floor(Math.random() * 3)] as any,
      version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
      lastUpdated: `2024-01-${String(Math.floor(Math.random() * 25) + 1).padStart(2, "0")}`,
      parameters: `${Math.round(Math.random() * 500 + 1)}${Math.random() > 0.7 ? "B" : "M"}`,
      framework,
      useCase: `${subcategory} Application`,
      icon,
    })
  }

  return additionalModels
}

const allModels = [...mlModels, ...generateAdditionalModels()]

export function MLModelShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedModel, setSelectedModel] = useState<MLModel | null>(null)
  const [sortBy, setSortBy] = useState("accuracy")

  const categories = Array.from(new Set(allModels.map((model) => model.category)))
  const statuses = Array.from(new Set(allModels.map((model) => model.status)))

  const filteredModels = useMemo(() => {
    const filtered = allModels.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.useCase.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || model.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || model.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort models
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "accuracy":
          return b.accuracy - a.accuracy
        case "latency":
          return a.latency - b.latency
        case "throughput":
          return b.throughput - a.throughput
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "training":
        return "bg-yellow-500"
      case "deployed":
        return "bg-blue-500"
      case "deprecated":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "training":
        return "secondary"
      case "deployed":
        return "outline"
      default:
        return "destructive"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Models</p>
                <p className="text-2xl font-bold text-primary">{allModels.length}</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-green-400">
                  {allModels.filter((m) => m.status === "active").length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-accent">{categories.length}</p>
              </div>
              <Layers className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                <p className="text-2xl font-bold text-chart-3">
                  {Math.round((allModels.reduce((acc, m) => acc + m.accuracy, 0) / allModels.length) * 10) / 10}%
                </p>
              </div>
              <Target className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="gradient-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search models by name, description, or use case..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accuracy">Accuracy</SelectItem>
                <SelectItem value="latency">Latency</SelectItem>
                <SelectItem value="throughput">Throughput</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredModels.length} of {allModels.length} models
          </div>
        </CardContent>
      </Card>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredModels.map((model) => {
          const Icon = model.icon
          return (
            <Card
              key={model.id}
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg gradient-border"
              onClick={() => setSelectedModel(model)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
                  </div>
                  <Badge variant={getStatusBadgeVariant(model.status)} className="text-xs">
                    {model.status}
                  </Badge>
                </div>

                <h3 className="font-semibold text-sm mb-1">{model.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{model.category}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{model.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Accuracy</span>
                    <span className="font-mono">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-1" />

                  <div className="flex justify-between text-xs">
                    <span>Latency</span>
                    <span className="font-mono">{model.latency}ms</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>Throughput</span>
                    <span className="font-mono">{model.throughput}/s</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{model.framework}</span>
                    <span className="text-muted-foreground">{model.version}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Model Detail Modal */}
      {selectedModel && (
        <Card className="gradient-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <selectedModel.icon className="h-6 w-6" />
                {selectedModel.name} - Detailed View
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedModel(null)}>
                ✕
              </Button>
            </div>
            <CardDescription>{selectedModel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy</span>
                    <Badge variant="secondary">{selectedModel.accuracy}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Latency</span>
                    <Badge variant="secondary">{selectedModel.latency}ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Throughput</span>
                    <Badge variant="secondary">{selectedModel.throughput}/s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <Badge variant="secondary">{selectedModel.memoryUsage}MB</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Model Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Category</span>
                    <Badge variant="outline">{selectedModel.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subcategory</span>
                    <Badge variant="outline">{selectedModel.subcategory}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Framework</span>
                    <Badge variant="outline">{selectedModel.framework}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Parameters</span>
                    <Badge variant="outline">{selectedModel.parameters}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deployment Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status</span>
                    <Badge variant={getStatusBadgeVariant(selectedModel.status)}>{selectedModel.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Version</span>
                    <Badge variant="secondary">{selectedModel.version}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Updated</span>
                    <Badge variant="secondary">{selectedModel.lastUpdated}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Use Case</span>
                    <Badge variant="secondary">{selectedModel.useCase}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

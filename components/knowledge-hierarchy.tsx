"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  FileText,
  GitBranch,
  Users,
  Building,
  Crown,
  ArrowUp,
  Network,
  Eye,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react"

interface KnowledgeNode {
  id: string
  title: string
  level: number
  type: "solid" | "liquid"
  confidence: number
  authority: number
  usage: number
  lastUpdated: string
  contributors: number
  validations: number
  category: string
  description: string
  connections: string[]
}

interface OrganizationalNode {
  id: string
  name: string
  role: string
  department: string
  level: number
  connections: string[]
  influence: number
  knowledgeContribution: number
  collaborationScore: number
  type: "person" | "team" | "department"
}

const knowledgeLevels = [
  {
    level: 0,
    name: "Raw Events",
    description: "Files, logs, transcripts with data volume indicators",
    icon: FileText,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    count: 2847392,
  },
  {
    level: 1,
    name: "Actions/Claims",
    description: "Discrete decisions with actor attribution",
    icon: Target,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    count: 156743,
  },
  {
    level: 2,
    name: "Procedures/Patterns",
    description: "Repeatable sequences with frequency metrics",
    icon: GitBranch,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    count: 23891,
  },
  {
    level: 3,
    name: "Rules/Heuristics",
    description: "Formalized procedures with confidence scores",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    count: 4567,
  },
  {
    level: 4,
    name: "Organizational Standards",
    description: "Company-level SOPs with approval workflows",
    icon: Building,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    count: 892,
  },
  {
    level: 5,
    name: "Canonical Knowledge",
    description: "Domain ontologies with version control",
    icon: Crown,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    count: 127,
  },
]

const sampleKnowledgeNodes: KnowledgeNode[] = [
  {
    id: "node-1",
    title: "Customer Onboarding Process",
    level: 4,
    type: "solid",
    confidence: 94.2,
    authority: 87.5,
    usage: 1247,
    lastUpdated: "2024-01-20",
    contributors: 12,
    validations: 45,
    category: "Operations",
    description: "Standardized process for onboarding new enterprise customers",
    connections: ["node-2", "node-5", "node-8"],
  },
  {
    id: "node-2",
    title: "API Authentication Flow",
    level: 3,
    type: "solid",
    confidence: 98.1,
    authority: 92.3,
    usage: 2341,
    lastUpdated: "2024-01-18",
    contributors: 8,
    validations: 67,
    category: "Security",
    description: "OAuth 2.0 implementation with JWT tokens",
    connections: ["node-1", "node-3", "node-7"],
  },
  {
    id: "node-3",
    title: "Database Migration Strategy",
    level: 2,
    type: "liquid",
    confidence: 76.4,
    authority: 68.9,
    usage: 456,
    lastUpdated: "2024-01-15",
    contributors: 15,
    validations: 23,
    category: "Engineering",
    description: "Best practices for zero-downtime database migrations",
    connections: ["node-2", "node-4", "node-9"],
  },
  {
    id: "node-4",
    title: "Performance Optimization Techniques",
    level: 1,
    type: "liquid",
    confidence: 82.7,
    authority: 71.2,
    usage: 789,
    lastUpdated: "2024-01-22",
    contributors: 23,
    validations: 34,
    category: "Engineering",
    description: "Code optimization patterns and database tuning",
    connections: ["node-3", "node-6", "node-10"],
  },
  {
    id: "node-5",
    title: "GDPR Compliance Framework",
    level: 5,
    type: "solid",
    confidence: 99.2,
    authority: 96.8,
    usage: 3456,
    lastUpdated: "2024-01-10",
    contributors: 6,
    validations: 89,
    category: "Legal",
    description: "Comprehensive data protection and privacy compliance",
    connections: ["node-1", "node-7", "node-11"],
  },
]

const organizationalNodes: OrganizationalNode[] = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "VP Engineering",
    department: "Engineering",
    level: 5,
    connections: ["person-2", "person-3", "team-1"],
    influence: 94.2,
    knowledgeContribution: 87.5,
    collaborationScore: 91.3,
    type: "person",
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "Senior Architect",
    department: "Engineering",
    level: 4,
    connections: ["person-1", "person-4", "person-5"],
    influence: 78.9,
    knowledgeContribution: 92.1,
    collaborationScore: 85.7,
    type: "person",
  },
  {
    id: "team-1",
    name: "Platform Team",
    role: "Core Infrastructure",
    department: "Engineering",
    level: 3,
    connections: ["person-1", "team-2", "dept-1"],
    influence: 82.4,
    knowledgeContribution: 89.6,
    collaborationScore: 88.2,
    type: "team",
  },
  {
    id: "dept-1",
    name: "Engineering Department",
    role: "Technology Division",
    department: "Engineering",
    level: 6,
    connections: ["team-1", "team-2", "dept-2"],
    influence: 96.7,
    knowledgeContribution: 94.3,
    collaborationScore: 92.8,
    type: "department",
  },
]

export function KnowledgeHierarchy() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null)
  const [viewMode, setViewMode] = useState<"hierarchy" | "network">("hierarchy")
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % knowledgeLevels.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getNodesByLevel = (level: number) => {
    return sampleKnowledgeNodes.filter((node) => node.level === level)
  }

  const getTypeColor = (type: "solid" | "liquid") => {
    return type === "solid" ? "text-blue-400" : "text-amber-400"
  }

  const getTypeBadge = (type: "solid" | "liquid") => {
    return type === "solid" ? "Solid" : "Liquid"
  }

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <Card className="gradient-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Knowledge System Overview</h2>
              <p className="text-sm text-muted-foreground">
                5-level knowledge classification with organizational network analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "hierarchy" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("hierarchy")}
              >
                <Database className="h-4 w-4 mr-2" />
                Hierarchy
              </Button>
              <Button
                variant={viewMode === "network" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("network")}
              >
                <Network className="h-4 w-4 mr-2" />
                Networks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "hierarchy" ? (
        <>
          {/* Knowledge Hierarchy Levels */}
          <Card className="gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                5-Level Knowledge Classification System
              </CardTitle>
              <CardDescription>Hierarchical organization from raw events to canonical knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgeLevels.map((level, index) => {
                  const Icon = level.icon
                  const isActive = animationPhase === index
                  const isSelected = selectedLevel === level.level

                  return (
                    <Card
                      key={level.level}
                      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        isActive ? "ring-2 ring-primary shadow-lg" : ""
                      } ${isSelected ? "ring-2 ring-accent" : ""} ${level.bgColor}`}
                      onClick={() => setSelectedLevel(isSelected ? null : level.level)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-6 w-6 ${level.color}`} />
                              <Badge variant="outline" className="text-xs">
                                Level {level.level}
                              </Badge>
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{level.name}</h3>
                              <p className="text-xs text-muted-foreground">{level.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{level.count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">items</div>
                          </div>
                        </div>

                        {/* Promotion Flow Indicator */}
                        {index < knowledgeLevels.length - 1 && (
                          <div className="mt-3 flex justify-center">
                            <ArrowUp
                              className={`h-4 w-4 ${
                                isActive ? "text-primary animate-bounce" : "text-muted-foreground"
                              }`}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Level View */}
          {selectedLevel !== null && (
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const level = knowledgeLevels.find((l) => l.level === selectedLevel)
                    if (!level) return null
                    const Icon = level.icon
                    return (
                      <>
                        <Icon className="h-5 w-5" />
                        Level {selectedLevel}: {level.name}
                      </>
                    )
                  })()}
                </CardTitle>
                <CardDescription>{knowledgeLevels.find((l) => l.level === selectedLevel)?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {getNodesByLevel(selectedLevel).map((node) => (
                    <Card
                      key={node.id}
                      className="cursor-pointer transition-all duration-200 hover:scale-105"
                      onClick={() => setSelectedNode(node)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="outline" className={getTypeColor(node.type)}>
                            {getTypeBadge(node.type)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {node.category}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-sm mb-2">{node.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{node.description}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Confidence</span>
                            <span className="font-mono">{node.confidence}%</span>
                          </div>
                          <Progress value={node.confidence} className="h-1" />

                          <div className="flex justify-between text-xs">
                            <span>Authority</span>
                            <span className="font-mono">{node.authority}%</span>
                          </div>
                          <Progress value={node.authority} className="h-1" />
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">{node.contributors} contributors</span>
                            <span className="text-muted-foreground">{node.usage} uses</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Knowledge Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Knowledge Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">+23.4%</div>
                <Progress value={78.3} className="mb-2" />
                <p className="text-xs text-muted-foreground">This month vs last month</p>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  Active Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent mb-2">1,247</div>
                <Progress value={92.1} className="mb-2" />
                <p className="text-xs text-muted-foreground">Across all departments</p>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Validation Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">94.7%</div>
                <Progress value={94.7} className="mb-2" />
                <p className="text-xs text-muted-foreground">Human-validated knowledge</p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* Organizational Network View */}
          <Card className="gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Organizational Network Analysis
              </CardTitle>
              <CardDescription>Interactive visualization of knowledge flow and collaboration patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {organizationalNodes.map((node) => {
                  const getNodeIcon = () => {
                    switch (node.type) {
                      case "person":
                        return Users
                      case "team":
                        return GitBranch
                      case "department":
                        return Building
                      default:
                        return Users
                    }
                  }

                  const NodeIcon = getNodeIcon()

                  return (
                    <Card key={node.id} className="cursor-pointer transition-all duration-200 hover:scale-105">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <NodeIcon className="h-5 w-5 text-primary" />
                          <Badge variant="outline" className="text-xs">
                            {node.type}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-sm mb-1">{node.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{node.role}</p>
                        <p className="text-xs text-muted-foreground mb-3">{node.department}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Influence</span>
                            <span className="font-mono">{node.influence}%</span>
                          </div>
                          <Progress value={node.influence} className="h-1" />

                          <div className="flex justify-between text-xs">
                            <span>Knowledge</span>
                            <span className="font-mono">{node.knowledgeContribution}%</span>
                          </div>
                          <Progress value={node.knowledgeContribution} className="h-1" />

                          <div className="flex justify-between text-xs">
                            <span>Collaboration</span>
                            <span className="font-mono">{node.collaborationScore}%</span>
                          </div>
                          <Progress value={node.collaborationScore} className="h-1" />
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="text-xs text-muted-foreground">{node.connections.length} connections</div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Network Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="gradient-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Network Density</p>
                    <p className="text-2xl font-bold text-primary">0.73</p>
                  </div>
                  <Network className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Path Length</p>
                    <p className="text-2xl font-bold text-accent">2.4</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Clustering Coeff</p>
                    <p className="text-2xl font-bold text-chart-3">0.68</p>
                  </div>
                  <Target className="h-8 w-8 text-chart-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Centrality Score</p>
                    <p className="text-2xl font-bold text-chart-4">0.82</p>
                  </div>
                  <Eye className="h-8 w-8 text-chart-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Detailed Node Information Modal */}
      {selectedNode && (
        <Card className="gradient-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                {selectedNode.title} - Detailed Analysis
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                ✕
              </Button>
            </div>
            <CardDescription>{selectedNode.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Knowledge Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Level</span>
                    <Badge variant="secondary">Level {selectedNode.level}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Type</span>
                    <Badge variant="outline" className={getTypeColor(selectedNode.type)}>
                      {getTypeBadge(selectedNode.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence</span>
                    <Badge variant="secondary">{selectedNode.confidence}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Authority</span>
                    <Badge variant="secondary">{selectedNode.authority}%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Usage</span>
                    <Badge variant="secondary">{selectedNode.usage}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contributors</span>
                    <Badge variant="secondary">{selectedNode.contributors}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Validations</span>
                    <Badge variant="secondary">{selectedNode.validations}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Updated</span>
                    <Badge variant="secondary">{selectedNode.lastUpdated}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      Connected to {selectedNode.connections.length} other nodes
                    </div>
                    {selectedNode.connections.map((connectionId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Node {connectionId}</span>
                      </div>
                    ))}
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shield,
  Search,
  Globe,
  Server,
  Bug,
  Eye,
  AlertTriangle,
  Clock,
  Download,
  Play,
  CircleStopIcon as Stop,
  Settings,
} from "lucide-react"

interface ScanResult {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  target: string
  timestamp: string
}

interface ScanProgress {
  phase: string
  progress: number
  status: "running" | "completed" | "error"
}

export default function WebRaptor() {
  const [target, setTarget] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState<ScanProgress>({ phase: "", progress: 0, status: "completed" })
  const [results, setResults] = useState<ScanResult[]>([])
  const [selectedModules, setSelectedModules] = useState({
    subdomain: true,
    portScan: true,
    techStack: true,
    vulnerability: true,
    dirBrute: false,
    ssl: true,
  })

  const modules = [
    {
      id: "subdomain",
      name: "Subdomain Discovery",
      description: "Find subdomains using multiple techniques",
      icon: Globe,
    },
    { id: "portScan", name: "Port Scanning", description: "Identify open ports and services", icon: Server },
    {
      id: "techStack",
      name: "Technology Detection",
      description: "Identify web technologies and frameworks",
      icon: Settings,
    },
    {
      id: "vulnerability",
      name: "Vulnerability Scanning",
      description: "Test for common web vulnerabilities",
      icon: Bug,
    },
    {
      id: "dirBrute",
      name: "Directory Bruteforce",
      description: "Discover hidden directories and files",
      icon: Search,
    },
    { id: "ssl", name: "SSL/TLS Analysis", description: "Analyze SSL/TLS configuration", icon: Shield },
  ]

  const mockResults: ScanResult[] = [
    {
      id: "1",
      type: "subdomain",
      severity: "low",
      title: "Subdomain Discovered",
      description: "Found subdomain: admin.example.com",
      target: "admin.example.com",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      type: "port",
      severity: "medium",
      title: "Open Port Detected",
      description: "Port 22 (SSH) is open and accessible",
      target: "example.com:22",
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      type: "vulnerability",
      severity: "high",
      title: "SQL Injection Vulnerability",
      description: "Potential SQL injection found in login form",
      target: "example.com/login",
      timestamp: new Date().toISOString(),
    },
    {
      id: "4",
      type: "ssl",
      severity: "critical",
      title: "Weak SSL Configuration",
      description: "Server supports deprecated TLS 1.0 protocol",
      target: "example.com:443",
      timestamp: new Date().toISOString(),
    },
  ]

  const startScan = async () => {
    if (!target) return

    setIsScanning(true)
    setResults([])

    const phases = [
      "Initializing scan...",
      "Discovering subdomains...",
      "Scanning ports...",
      "Detecting technologies...",
      "Testing vulnerabilities...",
      "Analyzing SSL/TLS...",
      "Generating report...",
    ]

    for (let i = 0; i < phases.length; i++) {
      setScanProgress({
        phase: phases[i],
        progress: ((i + 1) / phases.length) * 100,
        status: "running",
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add mock results progressively
      if (i === 1) setResults((prev) => [...prev, mockResults[0]])
      if (i === 2) setResults((prev) => [...prev, mockResults[1]])
      if (i === 3) setResults((prev) => [...prev, mockResults[2]])
      if (i === 5) setResults((prev) => [...prev, mockResults[3]])
    }

    setScanProgress({
      phase: "Scan completed",
      progress: 100,
      status: "completed",
    })
    setIsScanning(false)
  }

  const stopScan = () => {
    setIsScanning(false)
    setScanProgress({
      phase: "Scan stopped",
      progress: 0,
      status: "error",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityCount = (severity: string) => {
    return results.filter((r) => r.severity === severity).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">WebRaptor</h1>
          </div>
          <p className="text-gray-300 text-lg">Comprehensive Web Application Security Assessment Platform</p>
          <Alert className="mt-4 border-yellow-500 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              <strong>Educational Use Only:</strong> This tool is designed for authorized security testing and
              educational purposes. Always ensure you have proper authorization before scanning any target.
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scan Configuration */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Scan Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">Configure your reconnaissance scan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target" className="text-white">
                    Target Domain
                  </Label>
                  <Input
                    id="target"
                    placeholder="example.com"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    disabled={isScanning}
                  />
                </div>

                <div>
                  <Label className="text-white mb-3 block">Scan Modules</Label>
                  <div className="space-y-3">
                    {modules.map((module) => {
                      const Icon = module.icon
                      return (
                        <div key={module.id} className="flex items-start space-x-3">
                          <Checkbox
                            id={module.id}
                            checked={selectedModules[module.id as keyof typeof selectedModules]}
                            onCheckedChange={(checked) =>
                              setSelectedModules((prev) => ({ ...prev, [module.id]: checked }))
                            }
                            disabled={isScanning}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-purple-400" />
                              <Label htmlFor={module.id} className="text-white text-sm font-medium">
                                {module.name}
                              </Label>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{module.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isScanning ? (
                    <Button onClick={startScan} className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={!target}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scan
                    </Button>
                  ) : (
                    <Button onClick={stopScan} variant="destructive" className="flex-1">
                      <Stop className="w-4 h-4 mr-2" />
                      Stop Scan
                    </Button>
                  )}
                </div>

                {/* Scan Progress */}
                {(isScanning || scanProgress.progress > 0) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-white">{scanProgress.phase}</span>
                    </div>
                    <Progress value={scanProgress.progress} className="bg-slate-700" />
                    <p className="text-xs text-gray-400">{Math.round(scanProgress.progress)}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Scan Results
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Security findings and reconnaissance data
                    </CardDescription>
                  </div>
                  {results.length > 0 && (
                    <Button variant="outline" size="sm" className="border-slate-600">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No scan results yet. Start a scan to see findings.</p>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                      <TabsTrigger value="overview" className="text-white">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="vulnerabilities" className="text-white">
                        Vulnerabilities
                      </TabsTrigger>
                      <TabsTrigger value="reconnaissance" className="text-white">
                        Reconnaissance
                      </TabsTrigger>
                      <TabsTrigger value="details" className="text-white">
                        Details
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-red-500/10 border-red-500/20">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-red-400">{getSeverityCount("critical")}</div>
                            <div className="text-sm text-red-300">Critical</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-orange-500/10 border-orange-500/20">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-400">{getSeverityCount("high")}</div>
                            <div className="text-sm text-orange-300">High</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-yellow-500/10 border-yellow-500/20">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-400">{getSeverityCount("medium")}</div>
                            <div className="text-sm text-yellow-300">Medium</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-blue-500/10 border-blue-500/20">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-400">{getSeverityCount("low")}</div>
                            <div className="text-sm text-blue-300">Low</div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recent Findings */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white">Recent Findings</h3>
                        {results.slice(0, 5).map((result) => (
                          <Card key={result.id} className="bg-slate-700/50 border-slate-600">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className={`${getSeverityColor(result.severity)} text-white`}>
                                      {result.severity.toUpperCase()}
                                    </Badge>
                                    <span className="text-sm text-gray-400">{result.type}</span>
                                  </div>
                                  <h4 className="font-medium text-white mb-1">{result.title}</h4>
                                  <p className="text-sm text-gray-300 mb-2">{result.description}</p>
                                  <p className="text-xs text-gray-400">Target: {result.target}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="vulnerabilities" className="space-y-4">
                      <div className="space-y-3">
                        {results
                          .filter(
                            (r) => r.type === "vulnerability" || r.severity === "critical" || r.severity === "high",
                          )
                          .map((result) => (
                            <Card key={result.id} className="bg-slate-700/50 border-slate-600">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge className={`${getSeverityColor(result.severity)} text-white`}>
                                        {result.severity.toUpperCase()}
                                      </Badge>
                                      <Bug className="w-4 h-4 text-red-400" />
                                    </div>
                                    <h4 className="font-medium text-white mb-1">{result.title}</h4>
                                    <p className="text-sm text-gray-300 mb-2">{result.description}</p>
                                    <p className="text-xs text-gray-400">Target: {result.target}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="reconnaissance" className="space-y-4">
                      <div className="space-y-3">
                        {results
                          .filter((r) => r.type === "subdomain" || r.type === "port" || r.type === "tech")
                          .map((result) => (
                            <Card key={result.id} className="bg-slate-700/50 border-slate-600">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                                        {result.type.toUpperCase()}
                                      </Badge>
                                      <Globe className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <h4 className="font-medium text-white mb-1">{result.title}</h4>
                                    <p className="text-sm text-gray-300 mb-2">{result.description}</p>
                                    <p className="text-xs text-gray-400">Target: {result.target}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="space-y-3">
                        {results.map((result) => (
                          <Card key={result.id} className="bg-slate-700/50 border-slate-600">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className={`${getSeverityColor(result.severity)} text-white`}>
                                      {result.severity.toUpperCase()}
                                    </Badge>
                                    <span className="text-sm text-gray-400">{result.type}</span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(result.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-white mb-1">{result.title}</h4>
                                  <p className="text-sm text-gray-300 mb-2">{result.description}</p>
                                  <p className="text-xs text-gray-400">Target: {result.target}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

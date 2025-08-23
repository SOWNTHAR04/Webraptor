"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Server, Search, Shield, AlertTriangle } from "lucide-react"

interface PortResult {
  port: number
  service: string
  state: "open" | "closed" | "filtered"
  version?: string
  banner?: string
}

export function PortScanner() {
  const [target, setTarget] = useState("")
  const [scanType, setScanType] = useState("common")
  const [isScanning, setIsScanning] = useState(false)
  const [ports, setPorts] = useState<PortResult[]>([])

  const mockPorts: PortResult[] = [
    { port: 22, service: "SSH", state: "open", version: "OpenSSH 8.2", banner: "SSH-2.0-OpenSSH_8.2p1" },
    { port: 80, service: "HTTP", state: "open", version: "Apache 2.4.41", banner: "Apache/2.4.41 (Ubuntu)" },
    { port: 443, service: "HTTPS", state: "open", version: "Apache 2.4.41", banner: "Apache/2.4.41 (Ubuntu)" },
    { port: 3306, service: "MySQL", state: "open", version: "MySQL 8.0.25" },
    { port: 8080, service: "HTTP-Alt", state: "open", version: "Jetty 9.4.43" },
    { port: 21, service: "FTP", state: "filtered" },
    { port: 25, service: "SMTP", state: "closed" },
  ]

  const startScan = async () => {
    setIsScanning(true)
    setPorts([])

    // Simulate progressive port discovery
    for (let i = 0; i < mockPorts.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setPorts((prev) => [...prev, mockPorts[i]])
    }

    setIsScanning(false)
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case "open":
        return "bg-green-600"
      case "closed":
        return "bg-red-600"
      case "filtered":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStateIcon = (state: string) => {
    switch (state) {
      case "open":
        return <Shield className="w-3 h-3" />
      case "filtered":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Server className="w-5 h-5" />
          Port Scanner
        </CardTitle>
        <CardDescription className="text-gray-400">
          Identify open ports and running services on the target system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="port-target" className="text-white">
              Target Host
            </Label>
            <Input
              id="port-target"
              placeholder="192.168.1.1 or example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              disabled={isScanning}
            />
          </div>
          <div>
            <Label htmlFor="scan-type" className="text-white">
              Scan Type
            </Label>
            <Select value={scanType} onValueChange={setScanType} disabled={isScanning}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="common">Common Ports (Top 1000)</SelectItem>
                <SelectItem value="full">Full Range (1-65535)</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={startScan}
              disabled={!target || isScanning}
              className="bg-purple-600 hover:bg-purple-700 w-full"
            >
              {isScanning ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Scan Ports
                </>
              )}
            </Button>
          </div>
        </div>

        {ports.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Port Scan Results ({ports.filter((p) => p.state === "open").length} open)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {ports.map((port, index) => (
                <Card key={index} className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-white">Port {port.port}</span>
                          <Badge className={`${getStateColor(port.state)} text-white flex items-center gap-1`}>
                            {getStateIcon(port.state)}
                            {port.state.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-400">{port.service}</span>
                        </div>
                        {port.version && <p className="text-sm text-gray-300 mb-1">Version: {port.version}</p>}
                        {port.banner && <p className="text-xs text-gray-400 font-mono">{port.banner}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

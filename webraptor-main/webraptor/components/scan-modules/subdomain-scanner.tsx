"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Globe, Search, ExternalLink } from "lucide-react"

interface Subdomain {
  name: string
  ip: string
  status: "active" | "inactive"
  ports: number[]
}

export function SubdomainScanner() {
  const [target, setTarget] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [subdomains, setSubdomains] = useState<Subdomain[]>([])

  const mockSubdomains: Subdomain[] = [
    { name: "www.example.com", ip: "192.168.1.1", status: "active", ports: [80, 443] },
    { name: "mail.example.com", ip: "192.168.1.2", status: "active", ports: [25, 587, 993] },
    { name: "ftp.example.com", ip: "192.168.1.3", status: "active", ports: [21, 22] },
    { name: "admin.example.com", ip: "192.168.1.4", status: "active", ports: [80, 443, 8080] },
    { name: "dev.example.com", ip: "192.168.1.5", status: "inactive", ports: [] },
  ]

  const startScan = async () => {
    setIsScanning(true)
    setSubdomains([])

    // Simulate progressive discovery
    for (let i = 0; i < mockSubdomains.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubdomains((prev) => [...prev, mockSubdomains[i]])
    }

    setIsScanning(false)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Subdomain Discovery
        </CardTitle>
        <CardDescription className="text-gray-400">
          Discover subdomains using multiple techniques including DNS enumeration, certificate transparency, and brute
          force
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="subdomain-target" className="text-white">
              Target Domain
            </Label>
            <Input
              id="subdomain-target"
              placeholder="example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              disabled={isScanning}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={startScan} disabled={!target || isScanning} className="bg-purple-600 hover:bg-purple-700">
              {isScanning ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </div>

        {subdomains.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Discovered Subdomains ({subdomains.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {subdomains.map((subdomain, index) => (
                <Card key={index} className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{subdomain.name}</h4>
                          <Badge
                            variant={subdomain.status === "active" ? "default" : "secondary"}
                            className={subdomain.status === "active" ? "bg-green-600" : "bg-gray-600"}
                          >
                            {subdomain.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">IP: {subdomain.ip}</p>
                        {subdomain.ports.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-xs text-gray-400">Open ports:</span>
                            {subdomain.ports.map((port) => (
                              <Badge key={port} variant="outline" className="text-xs border-purple-400 text-purple-400">
                                {port}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
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

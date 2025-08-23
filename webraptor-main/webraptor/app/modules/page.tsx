"use client"
import { SubdomainScanner } from "@/components/scan-modules/subdomain-scanner"
import { PortScanner } from "@/components/scan-modules/port-scanner"
import { VulnerabilityScanner } from "@/components/scan-modules/vulnerability-scanner"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-purple-400">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Scan Modules</h1>
              <p className="text-gray-300">Individual security assessment tools</p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-8">
          <SubdomainScanner />
          <PortScanner />
          <VulnerabilityScanner />
        </div>
      </div>
    </div>
  )
}

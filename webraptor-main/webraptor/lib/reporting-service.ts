import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export interface ScanResult {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  target: string
  timestamp: string
  solution?: string
  cve?: string
  cvss?: number
}

export interface OsintData {
  subdomains: { name: string; ip: string; status: string }[]
  openPorts: { host: string; port: number; service: string; state: string }[]
  technologies: { name: string; version: string; category: string }[]
  whois?: Record<string, string>
  dns?: Record<string, string[]>
}

export interface ReportData {
  target: string
  scanDate: string
  scanDuration: string
  vulnerabilities: ScanResult[]
  osintData: OsintData
  summary?: string
}

export async function generateReportSummary(reportData: ReportData): Promise<string> {
  try {
    const vulnerabilitiesSummary = reportData.vulnerabilities
      .map(
        (v) =>
          `- ${v.title} (${v.severity.toUpperCase()}): ${v.description}${v.solution ? ` Solution: ${v.solution}` : ""}`,
      )
      .join("\n")

    const subdomainsSummary = reportData.osintData.subdomains
      .map((s) => `- ${s.name} (${s.ip}) - ${s.status}`)
      .join("\n")

    const portsSummary = reportData.osintData.openPorts
      .map((p) => `- ${p.host}:${p.port} - ${p.service} (${p.state})`)
      .join("\n")

    const techSummary = reportData.osintData.technologies
      .map((t) => `- ${t.name} ${t.version ? `v${t.version}` : ""} (${t.category})`)
      .join("\n")

    const prompt = `
You are a cybersecurity expert analyzing the results of a web application security scan. 
Generate a comprehensive executive summary of the scan results for the target ${reportData.target}.

The scan was conducted on ${reportData.scanDate} and took ${reportData.scanDuration}.

Vulnerabilities found:
${vulnerabilitiesSummary}

Discovered subdomains:
${subdomainsSummary}

Open ports:
${portsSummary}

Detected technologies:
${techSummary}

Please provide:
1. An executive summary of the findings (2-3 paragraphs)
2. A risk assessment based on the vulnerabilities found
3. Prioritized recommendations for remediation
4. Potential business impact if vulnerabilities are exploited

Format the response in markdown with appropriate headings and bullet points.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1500,
    })

    return text
  } catch (error) {
    console.error("Error generating report summary:", error)
    return "Error generating report summary. Please try again later."
  }
}

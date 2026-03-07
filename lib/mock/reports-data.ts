/**
 * Mock data for the Reports module — pre-built and custom report generation.
 * All data is fictional for demo/interview purposes.
 */

import type { DistrictId } from "./explore-data"

export interface ReportTemplate {
  id: string
  name: string
  industry: string
  description: string
  metrics: string[]
  sampleInsight: string
  whiteLabel?: boolean
}

export interface GeneratedReport {
  id: string
  templateId: string
  title: string
  createdAt: string
  location: string
  fileSize: string
  status: "completed" | "processing"
}

export interface ScheduledReport {
  id: string
  templateId: string
  frequency: "weekly" | "monthly"
  email: string
  enabled: boolean
  nextRun: string
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "retail-site",
    name: "Retail Site Report",
    industry: "Retail",
    description: "Footfall, demographics, and peak hours for retail site selection.",
    metrics: ["Footfall", "Demographics", "Peak Hours", "Dwell Time", "Benchmark"],
    sampleInsight: "Location {{location}} saw {{trend}}% footfall change in Q1 driven by growth in the 25-34 segment.",
    whiteLabel: false,
  },
  {
    id: "real-estate",
    name: "Real Estate Demand Report",
    industry: "Real Estate",
    description: "Demand indicators and demographic heat for property development.",
    metrics: ["Footfall", "Demographics", "Income Zones", "Visitor Origin", "Benchmark"],
    sampleInsight: "{{location}} shows strong demand with above-average footfall and high income tier concentration.",
    whiteLabel: false,
  },
  {
    id: "tourism",
    name: "Tourism Flow Report",
    industry: "Tourism",
    description: "Tourism activity, seasonal patterns, and visitor origin analysis.",
    metrics: ["Footfall", "Tourism Activity", "Visitor Origin", "Day of Week", "Trend"],
    sampleInsight: "Tourism flow in {{location}} increased {{trend}}% vs previous quarter, with weekend peaks.",
    whiteLabel: false,
  },
  {
    id: "event",
    name: "Event Analysis Report",
    industry: "Events",
    description: "Event impact on footfall, peak hours, and dwell time.",
    metrics: ["Footfall", "Peak Hours", "Dwell Time", "Demographics", "Benchmark"],
    sampleInsight: "Event analysis for {{location}} indicates peak attendance between 17:00–20:00.",
    whiteLabel: true,
  },
  {
    id: "branch-optimisation",
    name: "Branch Optimisation Report",
    industry: "Banking",
    description: "Branch performance vs catchment, competitor density, and recommendations.",
    metrics: ["Footfall", "Competitor Density", "Income Zones", "Benchmark", "Recommendations"],
    sampleInsight: "{{location}} branch catchment shows {{trend}}% footfall trend with actionable optimisation opportunities.",
    whiteLabel: true,
  },
]

export const GENERATED_REPORTS: GeneratedReport[] = [
  { id: "r1", templateId: "retail-site", title: "Nizami Retail Q1 2025", createdAt: "2025-03-01", location: "Nizami", fileSize: "2.4 MB", status: "completed" },
  { id: "r2", templateId: "real-estate", title: "Yasamal Demand Report", createdAt: "2025-02-28", location: "Yasamal", fileSize: "1.8 MB", status: "completed" },
  { id: "r3", templateId: "tourism", title: "Sabail Tourism Flow", createdAt: "2025-02-25", location: "Sabail", fileSize: "3.1 MB", status: "completed" },
  { id: "r4", templateId: "event", title: "Event Analysis Narimanov", createdAt: "2025-02-20", location: "Narimanov", fileSize: "1.2 MB", status: "completed" },
  { id: "r5", templateId: "branch-optimisation", title: "Branch Optimisation Multi", createdAt: "2025-02-15", location: "Nizami, Yasamal", fileSize: "4.0 MB", status: "processing" },
  { id: "r6", templateId: "retail-site", title: "Nasimi Site Report", createdAt: "2025-02-10", location: "Nasimi", fileSize: "2.1 MB", status: "completed" },
  { id: "r7", templateId: "tourism", title: "Tourism Q4 2024", createdAt: "2025-01-05", location: "Sabail, Nizami", fileSize: "3.5 MB", status: "completed" },
  { id: "r8", templateId: "real-estate", title: "Khatai Demand", createdAt: "2024-12-20", location: "Khatai", fileSize: "1.9 MB", status: "completed" },
]

export const SCHEDULED_REPORTS: ScheduledReport[] = [
  { id: "s1", templateId: "retail-site", frequency: "weekly", email: "analyst@company.com", enabled: true, nextRun: "2025-03-10" },
  { id: "s2", templateId: "tourism", frequency: "monthly", email: "tourism@company.com", enabled: true, nextRun: "2025-03-31" },
  { id: "s3", templateId: "branch-optimisation", frequency: "monthly", email: "ops@company.com", enabled: false, nextRun: "2025-04-01" },
  { id: "s4", templateId: "real-estate", frequency: "weekly", email: "re@company.com", enabled: true, nextRun: "2025-03-10" },
]

export const BENCHMARK_DATA: Record<DistrictId, number> = {
  nizami: 11200,
  nasimi: 9800,
  narimanov: 8900,
  sabail: 10500,
  khatai: 7200,
  binagadi: 5400,
  surakhani: 3800,
  yasamal: 10200,
  sabunchu: 4100,
  khazar: 5800,
  nizami_rayon: 7500,
  balakhani: 3200,
  mashtaga: 2500,
}

export function getReportTemplate(id: string): ReportTemplate | undefined {
  return REPORT_TEMPLATES.find((t) => t.id === id)
}

/**
 * Mock data for the Campaigns module — ad empowerment and audience targeting.
 * All data is fictional for demo/interview purposes.
 */

import type { DistrictId } from "./explore-data"

export interface AgeBandPercent {
  band: string
  percent: number
}

export interface IncomeTierPercent {
  low: number
  mid: number
  high: number
}

export interface AudienceSegment {
  id: string
  name: string
  estimatedSize: number
  districts: DistrictId[]
  ageBands: AgeBandPercent[]
  incomeTier: IncomeTierPercent
  genderIndex: number
  overlapWithBase: number
}

export interface Competitor {
  id: string
  name: string
  districtId: DistrictId
  avgDailyFootfall: number
  visitorOverlap: number
}

export interface CampaignTimelinePoint {
  week: number
  footfall: number
  label: string
}

export interface DistrictLift {
  districtId: DistrictId
  districtName: string
  beforeFootfall: number
  afterFootfall: number
  lift: number
}

export interface Campaign {
  id: string
  name: string
  startDate: string
  endDate: string
  targetDistricts: DistrictId[]
  beforeFootfall: number
  afterFootfall: number
  lift: number
  timeline: CampaignTimelinePoint[]
  districtLift: DistrictLift[]
}

export interface BudgetRecommendation {
  districtId: DistrictId
  districtName: string
  recommendedBudget: number
  footfallWeight: number
}

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: "young-urban",
    name: "Young Urban Shoppers",
    estimatedSize: 124500,
    districts: ["nizami", "nasimi", "yasamal"],
    ageBands: [
      { band: "18-24", percent: 28 },
      { band: "25-34", percent: 42 },
      { band: "35-44", percent: 22 },
      { band: "45+", percent: 8 },
    ],
    incomeTier: { low: 15, mid: 55, high: 30 },
    genderIndex: 1.02,
    overlapWithBase: 34,
  },
  {
    id: "commuters",
    name: "Commuters",
    estimatedSize: 89200,
    districts: ["narimanov", "nizami", "sabail", "khatai"],
    ageBands: [
      { band: "18-24", percent: 18 },
      { band: "25-34", percent: 38 },
      { band: "35-44", percent: 32 },
      { band: "45+", percent: 12 },
    ],
    incomeTier: { low: 22, mid: 58, high: 20 },
    genderIndex: 1.15,
    overlapWithBase: 41,
  },
  {
    id: "tourists",
    name: "Tourists",
    estimatedSize: 45600,
    districts: ["sabail", "nizami", "yasamal"],
    ageBands: [
      { band: "18-24", percent: 22 },
      { band: "25-34", percent: 35 },
      { band: "35-44", percent: 28 },
      { band: "45+", percent: 15 },
    ],
    incomeTier: { low: 12, mid: 45, high: 43 },
    genderIndex: 0.95,
    overlapWithBase: 12,
  },
  {
    id: "weekend-visitors",
    name: "Weekend Visitors",
    estimatedSize: 67800,
    districts: ["nizami", "yasamal", "sabail", "binagadi"],
    ageBands: [
      { band: "18-24", percent: 25 },
      { band: "25-34", percent: 40 },
      { band: "35-44", percent: 25 },
      { band: "45+", percent: 10 },
    ],
    incomeTier: { low: 18, mid: 52, high: 30 },
    genderIndex: 0.98,
    overlapWithBase: 28,
  },
  {
    id: "high-income",
    name: "High-Income Professionals",
    estimatedSize: 32100,
    districts: ["nizami", "yasamal", "sabail"],
    ageBands: [
      { band: "18-24", percent: 8 },
      { band: "25-34", percent: 35 },
      { band: "35-44", percent: 42 },
      { band: "45+", percent: 15 },
    ],
    incomeTier: { low: 5, mid: 25, high: 70 },
    genderIndex: 1.08,
    overlapWithBase: 52,
  },
]

export const COMPETITORS: Competitor[] = [
  {
    id: "comp-1",
    name: "Baku Mall",
    districtId: "nizami",
    avgDailyFootfall: 18500,
    visitorOverlap: 34,
  },
  {
    id: "comp-2",
    name: "Metro Park",
    districtId: "yasamal",
    avgDailyFootfall: 12200,
    visitorOverlap: 28,
  },
  {
    id: "comp-3",
    name: "28 Mall",
    districtId: "narimanov",
    avgDailyFootfall: 9800,
    visitorOverlap: 22,
  },
  {
    id: "comp-4",
    name: "Port Baku",
    districtId: "sabail",
    avgDailyFootfall: 15400,
    visitorOverlap: 31,
  },
  {
    id: "comp-5",
    name: "Ganjlik Mall",
    districtId: "yasamal",
    avgDailyFootfall: 11200,
    visitorOverlap: 26,
  },
  {
    id: "comp-6",
    name: "Park Bulvar",
    districtId: "sabail",
    avgDailyFootfall: 13800,
    visitorOverlap: 29,
  },
]

function makeTimeline(
  before: number,
  after: number,
  startWeek: number,
  campaignStartWeek: number
): CampaignTimelinePoint[] {
  const points: CampaignTimelinePoint[] = []
  for (let w = startWeek; w <= startWeek + 12; w++) {
    const t = (w - campaignStartWeek) / 8
    const val = w < campaignStartWeek ? before : before + (after - before) * Math.min(1, t)
    points.push({ week: w, footfall: Math.round(val), label: `W${w}` })
  }
  return points
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    name: "Summer 2024 Nizami Push",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    targetDistricts: ["nizami", "yasamal"],
    beforeFootfall: 24500,
    afterFootfall: 28900,
    lift: 18,
    timeline: makeTimeline(24500, 28900, 22, 23),
    districtLift: [
      { districtId: "nizami", districtName: "Nizami", beforeFootfall: 12450, afterFootfall: 14800, lift: 18.9 },
      { districtId: "yasamal", districtName: "Yasamal", beforeFootfall: 9230, afterFootfall: 10800, lift: 17 },
    ],
  },
  {
    id: "camp-2",
    name: "Back to School Sabail",
    startDate: "2024-08-15",
    endDate: "2024-09-15",
    targetDistricts: ["sabail", "nizami"],
    beforeFootfall: 18200,
    afterFootfall: 20100,
    lift: 10.4,
    timeline: makeTimeline(18200, 20100, 33, 34),
    districtLift: [
      { districtId: "sabail", districtName: "Sabail", beforeFootfall: 8900, afterFootfall: 9800, lift: 10.1 },
      { districtId: "nizami", districtName: "Nizami", beforeFootfall: 9300, afterFootfall: 10300, lift: 10.8 },
    ],
  },
  {
    id: "camp-3",
    name: "Holiday Season 2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    targetDistricts: ["nizami", "yasamal", "sabail", "narimanov"],
    beforeFootfall: 52000,
    afterFootfall: 67800,
    lift: 30.4,
    timeline: makeTimeline(52000, 67800, 48, 49),
    districtLift: [
      { districtId: "nizami", districtName: "Nizami", beforeFootfall: 15200, afterFootfall: 19800, lift: 30.3 },
      { districtId: "yasamal", districtName: "Yasamal", beforeFootfall: 11200, afterFootfall: 14600, lift: 30.4 },
      { districtId: "sabail", districtName: "Sabail", beforeFootfall: 13800, afterFootfall: 17800, lift: 29 },
      { districtId: "narimanov", districtName: "Narimanov", beforeFootfall: 11800, afterFootfall: 15600, lift: 32.2 },
    ],
  },
  {
    id: "camp-4",
    name: "Q1 2025 Nasimi Launch",
    startDate: "2025-01-10",
    endDate: "2025-03-31",
    targetDistricts: ["nasimi", "nizami"],
    beforeFootfall: 15600,
    afterFootfall: 17200,
    lift: 10.3,
    timeline: makeTimeline(15600, 17200, 2, 3),
    districtLift: [
      { districtId: "nasimi", districtName: "Nasimi", beforeFootfall: 7200, afterFootfall: 8000, lift: 11.1 },
      { districtId: "nizami", districtName: "Nizami", beforeFootfall: 8400, afterFootfall: 9200, lift: 9.5 },
    ],
  },
]

export const BUDGET_RECOMMENDATIONS: BudgetRecommendation[] = [
  { districtId: "nizami", districtName: "Nizami", recommendedBudget: 4200, footfallWeight: 28 },
  { districtId: "yasamal", districtName: "Yasamal", recommendedBudget: 3100, footfallWeight: 21 },
  { districtId: "sabail", districtName: "Sabail", recommendedBudget: 2800, footfallWeight: 19 },
  { districtId: "narimanov", districtName: "Narimanov", recommendedBudget: 1900, footfallWeight: 13 },
  { districtId: "nasimi", districtName: "Nasimi", recommendedBudget: 1500, footfallWeight: 10 },
  { districtId: "khatai", districtName: "Khatai", recommendedBudget: 900, footfallWeight: 6 },
  { districtId: "binagadi", districtName: "Binagadi", recommendedBudget: 400, footfallWeight: 3 },
  { districtId: "surakhani", districtName: "Surakhani", recommendedBudget: 200, footfallWeight: 1 },
]

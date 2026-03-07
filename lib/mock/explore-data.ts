/**
 * Mock data for the Explore module — location intelligence for Baku districts.
 * All data is fictional for demo/interview purposes.
 */

export type DistrictId =
  | "nizami"
  | "nasimi"
  | "narimanov"
  | "sabail"
  | "khatai"
  | "binagadi"
  | "surakhani"
  | "yasamal"

export type LayerType =
  | "footfall"
  | "demographic"
  | "income"
  | "tourism"
  | "competitor"

export type Season = "spring" | "summer" | "autumn" | "winter"

export interface PeakHour {
  hour: number
  count: number
}

export interface DayOfWeek {
  day: string
  count: number
}

export interface AgeBand {
  band: string
  percent: number
}

export interface IncomeTier {
  low: number
  mid: number
  high: number
}

export interface DwellTime {
  under15: number
  between15and60: number
  over60: number
}

export interface VisitorOrigin {
  district: string
  percent: number
}

export interface TrendPoint {
  week: number
  footfall: number
}

export interface District {
  id: DistrictId
  name: string
  polygon: [number, number][]
  avgDailyFootfall: number
  peakHour: number
  trend: number
  peakHours: PeakHour[]
  dayOfWeek: DayOfWeek[]
  demographics: {
    age: AgeBand[]
    income: IncomeTier
    genderIndex: number
  }
  dwellTime: DwellTime
  visitorOrigin: VisitorOrigin[]
  trendLine: TrendPoint[]
  footfallDensity: number
  demographicHeat: number
  incomeZone: number
  tourismActivity: number
  competitorDensity: number
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function makePolygon(
  centerLat: number,
  centerLng: number,
  size: number
): [number, number][] {
  const half = size / 2
  return [
    [centerLng - half, centerLat - half],
    [centerLng + half, centerLat - half],
    [centerLng + half, centerLat + half],
    [centerLng - half, centerLat + half],
    [centerLng - half, centerLat - half],
  ]
}

export const DISTRICTS: District[] = [
  {
    id: "nizami",
    name: "Nizami",
    polygon: makePolygon(40.395, 49.855, 0.04),
    avgDailyFootfall: 12450,
    peakHour: 18,
    trend: 8.2,
    peakHours: [
      { hour: 0, count: 120 },
      { hour: 1, count: 80 },
      { hour: 2, count: 50 },
      { hour: 3, count: 40 },
      { hour: 4, count: 60 },
      { hour: 5, count: 90 },
      { hour: 6, count: 180 },
      { hour: 7, count: 420 },
      { hour: 8, count: 680 },
      { hour: 9, count: 720 },
      { hour: 10, count: 650 },
      { hour: 11, count: 580 },
      { hour: 12, count: 620 },
      { hour: 13, count: 590 },
      { hour: 14, count: 540 },
      { hour: 15, count: 560 },
      { hour: 16, count: 640 },
      { hour: 17, count: 820 },
      { hour: 18, count: 950 },
      { hour: 19, count: 880 },
      { hour: 20, count: 720 },
      { hour: 21, count: 480 },
      { hour: 22, count: 280 },
      { hour: 23, count: 160 },
    ],
    dayOfWeek: [
      { day: DAYS[0], count: 1420 },
      { day: DAYS[1], count: 1580 },
      { day: DAYS[2], count: 1650 },
      { day: DAYS[3], count: 1720 },
      { day: DAYS[4], count: 1880 },
      { day: DAYS[5], count: 2100 },
      { day: DAYS[6], count: 2100 },
    ],
    demographics: {
      age: [
        { band: "18-24", percent: 22 },
        { band: "25-34", percent: 38 },
        { band: "35-44", percent: 24 },
        { band: "45+", percent: 16 },
      ],
      income: { low: 25, mid: 52, high: 23 },
      genderIndex: 1.05,
    },
    dwellTime: { under15: 35, between15and60: 48, over60: 17 },
    visitorOrigin: [
      { district: "Nasimi", percent: 28 },
      { district: "Yasamal", percent: 22 },
      { district: "Narimanov", percent: 18 },
      { district: "Sabail", percent: 14 },
      { district: "Binagadi", percent: 10 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 11000 + i * 180 + Math.sin(i) * 400,
    })),
    footfallDensity: 92,
    demographicHeat: 78,
    incomeZone: 72,
    tourismActivity: 88,
    competitorDensity: 85,
  },
  {
    id: "nasimi",
    name: "Nasimi",
    polygon: makePolygon(40.418, 49.872, 0.045),
    avgDailyFootfall: 9870,
    peakHour: 17,
    trend: 5.1,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 8 && h <= 20
          ? 300 + Math.abs(h - 14) * 50 + (h === 17 ? 200 : 0)
          : 100 + h * 5,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 1200 + i * 120 + (i >= 5 ? 300 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 28 },
        { band: "25-34", percent: 35 },
        { band: "35-44", percent: 22 },
        { band: "45+", percent: 15 },
      ],
      income: { low: 30, mid: 48, high: 22 },
      genderIndex: 0.98,
    },
    dwellTime: { under15: 42, between15and60: 44, over60: 14 },
    visitorOrigin: [
      { district: "Nizami", percent: 32 },
      { district: "Yasamal", percent: 20 },
      { district: "Narimanov", percent: 16 },
      { district: "Sabail", percent: 12 },
      { district: "Khatai", percent: 8 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 9000 + i * 120 + Math.cos(i * 0.5) * 300,
    })),
    footfallDensity: 78,
    demographicHeat: 82,
    incomeZone: 65,
    tourismActivity: 72,
    competitorDensity: 70,
  },
  {
    id: "narimanov",
    name: "Narimanov",
    polygon: makePolygon(40.405, 49.882, 0.038),
    avgDailyFootfall: 11200,
    peakHour: 19,
    trend: -2.3,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 9 && h <= 21
          ? 350 + Math.abs(h - 19) * 40 + (h === 19 ? 250 : 0)
          : 80 + h * 3,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 1400 + i * 100 + (i >= 5 ? 250 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 20 },
        { band: "25-34", percent: 40 },
        { band: "35-44", percent: 26 },
        { band: "45+", percent: 14 },
      ],
      income: { low: 22, mid: 55, high: 23 },
      genderIndex: 1.02,
    },
    dwellTime: { under15: 30, between15and60: 52, over60: 18 },
    visitorOrigin: [
      { district: "Nizami", percent: 24 },
      { district: "Nasimi", percent: 20 },
      { district: "Yasamal", percent: 18 },
      { district: "Binagadi", percent: 16 },
      { district: "Sabail", percent: 12 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 11500 - i * 80 + Math.sin(i * 0.3) * 200,
    })),
    footfallDensity: 85,
    demographicHeat: 75,
    incomeZone: 70,
    tourismActivity: 65,
    competitorDensity: 78,
  },
  {
    id: "sabail",
    name: "Sabail",
    polygon: makePolygon(40.382, 49.868, 0.035),
    avgDailyFootfall: 8450,
    peakHour: 18,
    trend: 12.4,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 10 && h <= 20
          ? 280 + Math.abs(h - 15) * 45 + (h === 18 ? 180 : 0)
          : 90 + h * 4,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 1000 + i * 90 + (i >= 5 ? 350 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 25 },
        { band: "25-34", percent: 36 },
        { band: "35-44", percent: 24 },
        { band: "45+", percent: 15 },
      ],
      income: { low: 28, mid: 50, high: 22 },
      genderIndex: 1.08,
    },
    dwellTime: { under15: 38, between15and60: 46, over60: 16 },
    visitorOrigin: [
      { district: "Nizami", percent: 30 },
      { district: "Nasimi", percent: 24 },
      { district: "Narimanov", percent: 16 },
      { district: "Khatai", percent: 14 },
      { district: "Yasamal", percent: 8 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 7500 + i * 150 + Math.sin(i * 0.4) * 250,
    })),
    footfallDensity: 72,
    demographicHeat: 70,
    incomeZone: 68,
    tourismActivity: 95,
    competitorDensity: 62,
  },
  {
    id: "khatai",
    name: "Khatai",
    polygon: makePolygon(40.392, 49.895, 0.032),
    avgDailyFootfall: 6780,
    peakHour: 17,
    trend: 3.8,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 7 && h <= 19
          ? 220 + Math.abs(h - 13) * 35 + (h === 17 ? 150 : 0)
          : 70 + h * 2,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 850 + i * 70 + (i >= 5 ? 200 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 26 },
        { band: "25-34", percent: 34 },
        { band: "35-44", percent: 25 },
        { band: "45+", percent: 15 },
      ],
      income: { low: 35, mid: 48, high: 17 },
      genderIndex: 0.95,
    },
    dwellTime: { under15: 45, between15and60: 42, over60: 13 },
    visitorOrigin: [
      { district: "Narimanov", percent: 26 },
      { district: "Nizami", percent: 22 },
      { district: "Nasimi", percent: 18 },
      { district: "Sabail", percent: 14 },
      { district: "Surakhani", percent: 8 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 6400 + i * 60 + Math.cos(i * 0.6) * 150,
    })),
    footfallDensity: 58,
    demographicHeat: 68,
    incomeZone: 55,
    tourismActivity: 45,
    competitorDensity: 72,
  },
  {
    id: "binagadi",
    name: "Binagadi",
    polygon: makePolygon(40.455, 49.815, 0.05),
    avgDailyFootfall: 5420,
    peakHour: 16,
    trend: -1.2,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 8 && h <= 18
          ? 180 + Math.abs(h - 12) * 30 + (h === 16 ? 120 : 0)
          : 50 + h * 2,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 650 + i * 55 + (i >= 5 ? 180 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 24 },
        { band: "25-34", percent: 32 },
        { band: "35-44", percent: 28 },
        { band: "45+", percent: 16 },
      ],
      income: { low: 38, mid: 45, high: 17 },
      genderIndex: 1.0,
    },
    dwellTime: { under15: 48, between15and60: 40, over60: 12 },
    visitorOrigin: [
      { district: "Narimanov", percent: 28 },
      { district: "Nizami", percent: 20 },
      { district: "Nasimi", percent: 16 },
      { district: "Yasamal", percent: 14 },
      { district: "Surakhani", percent: 10 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 5500 - i * 20 + Math.sin(i * 0.2) * 100,
    })),
    footfallDensity: 48,
    demographicHeat: 62,
    incomeZone: 52,
    tourismActivity: 35,
    competitorDensity: 55,
  },
  {
    id: "surakhani",
    name: "Surakhani",
    polygon: makePolygon(40.435, 49.945, 0.055),
    avgDailyFootfall: 4890,
    peakHour: 15,
    trend: 6.5,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 9 && h <= 17
          ? 160 + Math.abs(h - 13) * 25 + (h === 15 ? 100 : 0)
          : 45 + h * 1,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 580 + i * 50 + (i >= 5 ? 150 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 22 },
        { band: "25-34", percent: 30 },
        { band: "35-44", percent: 30 },
        { band: "45+", percent: 18 },
      ],
      income: { low: 42, mid: 42, high: 16 },
      genderIndex: 0.97,
    },
    dwellTime: { under15: 52, between15and60: 36, over60: 12 },
    visitorOrigin: [
      { district: "Narimanov", percent: 24 },
      { district: "Khatai", percent: 20 },
      { district: "Nizami", percent: 18 },
      { district: "Binagadi", percent: 16 },
      { district: "Nasimi", percent: 10 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 4500 + i * 80 + Math.cos(i * 0.5) * 120,
    })),
    footfallDensity: 42,
    demographicHeat: 58,
    incomeZone: 48,
    tourismActivity: 55,
    competitorDensity: 48,
  },
  {
    id: "yasamal",
    name: "Yasamal",
    polygon: makePolygon(40.428, 49.838, 0.04),
    avgDailyFootfall: 9230,
    peakHour: 18,
    trend: 4.2,
    peakHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count:
        h >= 8 && h <= 20
          ? 320 + Math.abs(h - 14) * 55 + (h === 18 ? 220 : 0)
          : 95 + h * 4,
    })),
    dayOfWeek: DAYS.map((day, i) => ({
      day,
      count: 1150 + i * 110 + (i >= 5 ? 280 : 0),
    })),
    demographics: {
      age: [
        { band: "18-24", percent: 30 },
        { band: "25-34", percent: 36 },
        { band: "35-44", percent: 22 },
        { band: "45+", percent: 12 },
      ],
      income: { low: 26, mid: 52, high: 22 },
      genderIndex: 1.03,
    },
    dwellTime: { under15: 36, between15and60: 50, over60: 14 },
    visitorOrigin: [
      { district: "Nizami", percent: 26 },
      { district: "Nasimi", percent: 24 },
      { district: "Narimanov", percent: 18 },
      { district: "Binagadi", percent: 14 },
      { district: "Sabail", percent: 10 },
    ],
    trendLine: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      footfall: 8800 + i * 70 + Math.sin(i * 0.35) * 180,
    })),
    footfallDensity: 75,
    demographicHeat: 80,
    incomeZone: 70,
    tourismActivity: 68,
    competitorDensity: 68,
  },
]

export function getDistrictById(id: DistrictId): District | undefined {
  return DISTRICTS.find((d) => d.id === id)
}

export function searchDistricts(query: string): District[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return DISTRICTS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q)
  )
}

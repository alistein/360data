"use client"

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const PULSE_CSS = `
@keyframes explorePulseOuter {
  0%, 100% { fill-opacity: 0.10; }
  50% { fill-opacity: 0.20; }
}
@keyframes explorePulseMid {
  0%, 100% { fill-opacity: 0.22; }
  50% { fill-opacity: 0.38; }
}
${DISTRICTS.map((_, i) => {
  const d = i * 0.3
  return `
.explore-pulse-outer-${i} { animation: explorePulseOuter 3s ease-in-out infinite; animation-delay: ${d}s; }
.explore-pulse-mid-${i} { animation: explorePulseMid 3s ease-in-out infinite; animation-delay: ${d}s; }
`
}).join("")}
`

function MapStyleInjector() {
  useEffect(() => {
    const id = "explore-map-pulse-styles"
    if (document.getElementById(id)) return
    const style = document.createElement("style")
    style.id = id
    style.textContent = PULSE_CSS
    document.head.appendChild(style)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [])
  return null
}

import {
  DISTRICTS,
  type DistrictId,
  type District,
  type LayerType,
  type Season,
} from "@/lib/mock/explore-data"

const LAYER_LABELS: Record<LayerType, string> = {
  footfall: "Footfall density",
  demographic: "Demographic heat",
  income: "Income zone",
  tourism: "Tourism activity",
  competitor: "Competitor density",
}

// Fix Leaflet default icon in Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

// Heatmap palette: light purple (low) -> deep purple (high)
const HEATMAP_STOPS: [number, number, number, number][] = [
  [0, 250, 245, 255], // very light lavender
  [25, 233, 213, 255], // light purple
  [50, 192, 132, 252], // medium purple
  [75, 147, 51, 234], // violet
  [100, 88, 28, 135], // deep purple
]

function interpolateHeatmap(value: number): string {
  const v = Math.max(0, Math.min(100, value))
  let i = 0
  while (i < HEATMAP_STOPS.length - 1 && HEATMAP_STOPS[i + 1][0] < v) i++
  const [p0, r0, g0, b0] = HEATMAP_STOPS[i]
  const [p1, r1, g1, b1] = HEATMAP_STOPS[i + 1]
  const t = (v - p0) / (p1 - p0)
  const r = Math.round(r0 + t * (r1 - r0))
  const g = Math.round(g0 + t * (g1 - g0))
  const b = Math.round(b0 + t * (b1 - b0))
  return `rgb(${r},${g},${b})`
}

function getLayerValue(
  district: (typeof DISTRICTS)[0],
  layer: LayerType
): number {
  return layer === "footfall"
    ? district.footfallDensity
    : layer === "demographic"
      ? district.demographicHeat
      : layer === "income"
        ? district.incomeZone
        : layer === "tourism"
          ? district.tourismActivity
          : district.competitorDensity
}

function districtCenter(
  district: (typeof DISTRICTS)[0]
): [number, number] {
  const lat =
    district.polygon.reduce((s, p) => s + p[1], 0) / district.polygon.length
  const lng =
    district.polygon.reduce((s, p) => s + p[0], 0) / district.polygon.length
  return [lat, lng]
}

function districtRadius(value: number): number {
  return 500 + (value / 100) * 800
}

function getPeakHourCount(district: District, hour: number): number {
  const entry = district.peakHours.find((p) => p.hour === hour)
  return entry?.count ?? 0
}

function topAgeBand(district: District): string {
  const top = district.demographics.age.reduce((a, b) =>
    a.percent >= b.percent ? a : b
  )
  return `${top.band} (${top.percent}%)`
}

function topIncomeTier(district: District): string {
  const { low, mid, high } = district.demographics.income
  if (mid >= low && mid >= high) return `Mid ${mid}%`
  if (high >= low && high >= mid) return `High ${high}%`
  return `Low ${low}%`
}

function topVisitorOrigin(district: District): string {
  const top = district.visitorOrigin[0]
  return top ? `${top.district} ${top.percent}%` : "—"
}

function DistrictTooltipContent({
  district,
  activeLayer,
  value,
  hour,
  season,
}: {
  district: District
  activeLayer: LayerType
  value: number
  hour: number
  season: Season
}) {
  const hourCount = getPeakHourCount(district, hour)
  const topAge = topAgeBand(district)
  const topIncome = topIncomeTier(district)
  const topOrigin = topVisitorOrigin(district)
  const dwellShort =
    district.dwellTime.between15and60 >= district.dwellTime.under15 &&
    district.dwellTime.between15and60 >= district.dwellTime.over60
      ? "15–60 min"
      : district.dwellTime.over60 >= district.dwellTime.under15
        ? "60+ min"
        : "<15 min"

  return (
    <div className="min-w-[280px] space-y-3 p-3 text-sm">
      <p className="font-semibold text-base">{district.name}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-muted-foreground">
        <span>{LAYER_LABELS[activeLayer]}</span>
        <span className="tabular-nums text-foreground">{Math.round(value)}</span>
        <span>Visitors/day</span>
        <span className="tabular-nums text-foreground">
          ~{district.avgDailyFootfall.toLocaleString()}
        </span>
        <span>Trend</span>
        <span
          className={
            district.trend >= 0 ? "text-emerald-600" : "text-red-600"
          }
        >
          {district.trend >= 0 ? "+" : ""}
          {district.trend}%
        </span>
        <span>Peak hour ({hour}:00)</span>
        <span className="tabular-nums text-foreground">{hourCount}</span>
        <span>Top age</span>
        <span className="text-foreground">{topAge}</span>
        <span>Income</span>
        <span className="text-foreground">{topIncome}</span>
        <span>Top origin</span>
        <span className="text-foreground">{topOrigin}</span>
        <span>Dwell</span>
        <span className="text-foreground">{dwellShort}</span>
      </div>
      <p className="pt-1 text-xs text-muted-foreground">
        {season.charAt(0).toUpperCase() + season.slice(1)} · Click to expand
      </p>
    </div>
  )
}

function FlyToDistrict({ districtId }: { districtId: DistrictId | null }) {
  const map = useMap()
  const district = DISTRICTS.find((d) => d.id === districtId)
  useEffect(() => {
    if (district) {
      const [lat, lng] = [
        district.polygon.reduce((s, p) => s + p[1], 0) / district.polygon.length,
        district.polygon.reduce((s, p) => s + p[0], 0) / district.polygon.length,
      ]
      map.flyTo([lat, lng], 13, { duration: 0.5 })
    }
  }, [districtId, district, map])
  return null
}

export function ExploreMap({
  selectedDistrictId,
  onSelectDistrict,
  activeLayer,
  hour,
  season,
}: {
  selectedDistrictId: DistrictId | null
  onSelectDistrict: (id: DistrictId | null) => void
  activeLayer: LayerType
  hour: number
  season: Season
}) {
  const [hoveredDistrictId, setHoveredDistrictId] =
    useState<DistrictId | null>(null)

  const sortedDistricts = [...DISTRICTS].sort((a, b) => {
    const aSel = a.id === selectedDistrictId ? 2 : a.id === hoveredDistrictId ? 1 : 0
    const bSel = b.id === selectedDistrictId ? 2 : b.id === hoveredDistrictId ? 1 : 0
    return aSel - bSel
  })

  return (
    <div className="relative h-full w-full">
      <MapStyleInjector />
      <MapContainer
        center={[40.4093, 49.8671]}
        zoom={11}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sortedDistricts.map((district, idx) => {
          const center = districtCenter(district)
          const value = getLayerValue(district, activeLayer)
          const color = interpolateHeatmap(value)
          const radius = districtRadius(value)
          const isSelected = district.id === selectedDistrictId
          const isHovered = district.id === hoveredDistrictId

          return (
            <React.Fragment key={district.id}>
              <Circle
                center={center}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.12,
                  stroke: false,
                  interactive: false,
                }}
                className={`explore-pulse-outer-${idx}`}
              />
              <Circle
                center={center}
                radius={radius * 0.65}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.28,
                  stroke: false,
                  interactive: false,
                }}
                className={`explore-pulse-mid-${idx}`}
              />
              <Circle
                center={center}
                radius={radius * 0.35}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isSelected ? 0.85 : isHovered ? 0.75 : 0.6,
                  color: isSelected ? "#0ea5e9" : color,
                  weight: isSelected ? 3 : isHovered ? 2.5 : 1.5,
                }}
              />
              <Circle
                center={center}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0,
                  color: "transparent",
                  weight: 0,
                  interactive: true,
                }}
                eventHandlers={{
                  click: () => onSelectDistrict(district.id),
                  mouseover: () => setHoveredDistrictId(district.id),
                  mouseout: () => setHoveredDistrictId(null),
                }}
              >
                <Tooltip
                  sticky
                  direction="top"
                  offset={[0, -10]}
                  opacity={0.98}
                  className="rounded-lg! border! border-border! bg-background! px-0! py-0! shadow-lg!"
                >
                  <DistrictTooltipContent
                    district={district}
                    activeLayer={activeLayer}
                    value={value}
                    hour={hour}
                    season={season}
                  />
                </Tooltip>
              </Circle>
            </React.Fragment>
          )
        })}
        <FlyToDistrict districtId={selectedDistrictId} />
      </MapContainer>
    </div>
  )
}

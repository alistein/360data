"use client"

import React, { useEffect } from "react"
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import {
  DISTRICTS,
  type DistrictId,
  type LayerType,
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
  return 1200 + (value / 100) * 2600
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
}: {
  selectedDistrictId: DistrictId | null
  onSelectDistrict: (id: DistrictId | null) => void
  activeLayer: LayerType
}) {
  return (
    <div className="relative h-full w-full">
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
        {DISTRICTS.map((district) => {
          const center = districtCenter(district)
          const value = getLayerValue(district, activeLayer)
          const color = interpolateHeatmap(value)
          const radius = districtRadius(value)
          const isSelected = district.id === selectedDistrictId

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
              />
              <Circle
                center={center}
                radius={radius * 0.35}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isSelected ? 0.85 : 0.6,
                  color: isSelected ? "#0ea5e9" : color,
                  weight: isSelected ? 3 : 1.5,
                }}
                eventHandlers={{
                  click: () => onSelectDistrict(district.id),
                  mouseover: (e) =>
                    (e.target as L.Path).setStyle({
                      fillOpacity: 0.85,
                      weight: 2.5,
                    }),
                  mouseout: (e) =>
                    (e.target as L.Path).setStyle({
                      fillOpacity: isSelected ? 0.85 : 0.6,
                      weight: isSelected ? 3 : 1.5,
                    }),
                }}
              >
                <Tooltip sticky direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="text-xs">
                    <p className="font-semibold">{district.name}</p>
                    <p>
                      {LAYER_LABELS[activeLayer]}: {Math.round(value)}
                    </p>
                    <p>
                      ~{district.avgDailyFootfall.toLocaleString()} visitors/day
                    </p>
                  </div>
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

"use client"

import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import type { DistrictId, LayerType, Season } from "@/lib/mock/explore-data"
import { searchDistricts } from "@/lib/mock/explore-data"

import { Input } from "@/components/ui/input"
import { RiSearchLine } from "@remixicon/react"
import { LayerControls } from "./layer-controls"
import { LocationPanel } from "./location-panel"
import { TimeSlider } from "./time-slider"

const ExploreMap = dynamic(
  () => import("./explore-map").then((m) => m.ExploreMap),
  { ssr: false }
)

export function ExploreClient() {
  const [selectedDistrictId, setSelectedDistrictId] =
    useState<DistrictId | null>(null)
  const [activeLayer, setActiveLayer] = useState<LayerType>("footfall")
  const [hour, setHour] = useState(12)
  const [season, setSeason] = useState<Season>("summer")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectDistrict = useCallback((id: DistrictId | null) => {
    setSelectedDistrictId(id)
  }, [])

  const handleSearchSelect = useCallback((id: DistrictId | null) => {
    setSelectedDistrictId(id)
  }, [])

  const matches = searchQuery.trim()
    ? searchDistricts(searchQuery)
    : []

  return (
    <div className="relative h-[calc(100vh-var(--header-height))] w-full overflow-hidden">
      <ExploreMap
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={handleSelectDistrict}
        activeLayer={activeLayer}
        hour={hour}
        season={season}
      />
      <div className="absolute left-3 right-3 top-3 z-1000 flex items-center gap-2">
        <LayerControls
          activeLayer={activeLayer}
          onLayerChange={setActiveLayer}
          className="static shrink-0"
        />
        <div className="relative min-w-0 flex-1 max-w-md">
          <div className="relative rounded-xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur-md">
            <RiSearchLine className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Nizami, Narimanov..."
              value={searchQuery}
              onChange={(e) => {
                const v = e.target.value
                setSearchQuery(v)
                const m = searchDistricts(v)
                if (
                  m.length === 1 &&
                  v.toLowerCase() === m[0].name.toLowerCase()
                ) {
                  handleSearchSelect(m[0].id)
                } else if (!v.trim()) {
                  handleSearchSelect(null)
                }
              }}
              className="h-6 border-0 bg-transparent py-0 pl-7 text-xs shadow-none focus-visible:ring-0"
            />
            {matches.length > 0 && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 -mx-4 mt-1 max-h-40 overflow-auto rounded-lg border border-border bg-background shadow-lg">
                {matches.slice(0, 5).map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      handleSearchSelect(d.id)
                      handleSelectDistrict(d.id)
                    }}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <TimeSlider
        hour={hour}
        season={season}
        onHourChange={setHour}
        onSeasonChange={setSeason}
      />
      <LocationPanel
        districtId={selectedDistrictId}
        onClose={() => setSelectedDistrictId(null)}
      />
    </div>
  )
}

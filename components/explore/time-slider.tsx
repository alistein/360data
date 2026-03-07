"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Season } from "@/lib/mock/explore-data"

const SEASONS: { id: Season; label: string }[] = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
]

const HOUR_LABELS: Record<number, string> = {
  0: "12am",
  6: "6am",
  12: "12pm",
  18: "6pm",
  23: "11pm",
}

export function TimeSlider({
  hour,
  season,
  onHourChange,
  onSeasonChange,
  className,
}: {
  hour: number
  season: Season
  onHourChange: (h: number) => void
  onSeasonChange: (s: Season) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "absolute bottom-3 left-3 right-3 z-[1000] flex flex-col gap-2 rounded-lg border bg-background/95 p-3 shadow-md backdrop-blur sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Hour:
        </span>
        <input
          type="range"
          min={0}
          max={23}
          value={hour}
          onChange={(e) => onHourChange(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
        <span className="min-w-[3ch] text-xs tabular-nums">
          {HOUR_LABELS[hour] ?? `${hour}:00`}
        </span>
      </div>
      <Select value={season} onValueChange={(v) => onSeasonChange(v as Season)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
        <SelectContent>
          {SEASONS.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

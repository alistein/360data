"use client"

import { cn } from "@/lib/utils"
import type { LayerType } from "@/lib/mock/explore-data"

const LAYERS: { id: LayerType; label: string }[] = [
  { id: "footfall", label: "Footfall" },
  { id: "demographic", label: "Demographic" },
  { id: "income", label: "Income" },
  { id: "tourism", label: "Tourism" },
  { id: "competitor", label: "Competitor" },
]

export function LayerControls({
  activeLayer,
  onLayerChange,
  className,
}: {
  activeLayer: LayerType
  onLayerChange: (layer: LayerType) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 rounded-xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur-md",
        className
      )}
    >
      {LAYERS.map((layer) => (
        <button
          key={layer.id}
          type="button"
          onClick={() => onLayerChange(layer.id)}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            activeLayer === layer.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {layer.label}
        </button>
      ))}
    </div>
  )
}

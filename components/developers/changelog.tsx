"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CHANGELOG } from "@/lib/mock/developers-data"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function Changelog() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="relative space-y-6">
            {CHANGELOG.map((entry, index) => (
              <div
                key={entry.version}
                className={`relative pl-6 ${
                  index < CHANGELOG.length - 1 ? "pb-6" : ""
                }`}
              >
                {index < CHANGELOG.length - 1 && (
                  <div
                    className="absolute left-[5px] top-6 h-full w-px bg-border"
                    aria-hidden
                  />
                )}
                <div
                  className={`absolute left-0 top-1 size-2.5 rounded-full bg-primary ${
                    index === 0 ? "ring-2 ring-primary/30" : "bg-muted-foreground/50"
                  }`}
                  aria-hidden
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={index === 0 ? "default" : "outline"}
                      className="font-mono text-xs"
                    >
                      v{entry.version}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <h3
                    className={`font-medium ${
                      index === 0 ? "text-base" : "text-sm"
                    }`}
                  >
                    {entry.summary}
                  </h3>
                  <ul className="list-inside list-disc space-y-0.5 text-sm text-muted-foreground">
                    {entry.changes.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

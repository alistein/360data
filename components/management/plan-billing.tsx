"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { INVOICES } from "@/lib/mock/management-data"
import { RiDownloadLine, RiArrowUpLine, RiArrowDownLine } from "@remixicon/react"
import { toast } from "sonner"

const PLAN = {
  name: "Business",
  billingCycle: "Monthly",
  nextRenewal: "2025-04-01",
  price: "299 AZN",
}

const USAGE = {
  apiCalls: { used: 28450, quota: 100000, label: "API calls" },
  reportExports: { used: 3, quota: 10, label: "Report exports" },
  teamSeats: { used: 6, quota: 10, label: "Team seats" },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function PlanBilling() {
  const handleDownload = (id: string) => {
    toast.success(`Invoice ${id} download started`)
  }

  const handleUpgrade = () => {
    toast.info("Upgrade flow would open here")
  }

  const handleDowngrade = () => {
    toast.info("Downgrade flow would open here")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Current Plan</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleDowngrade}>
              <RiArrowDownLine className="size-4" />
              Downgrade
            </Button>
            <Button size="sm" onClick={handleUpgrade}>
              <RiArrowUpLine className="size-4" />
              Upgrade
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-2xl font-semibold">{PLAN.name}</p>
          <p className="text-muted-foreground text-sm">
            {PLAN.billingCycle} · {PLAN.price}
          </p>
          <p className="text-muted-foreground text-xs">
            Next renewal: {formatDate(PLAN.nextRenewal)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Usage vs Quota</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>{USAGE.apiCalls.label}</span>
              <span className="text-muted-foreground">
                {USAGE.apiCalls.used.toLocaleString()} /{" "}
                {USAGE.apiCalls.quota.toLocaleString()} (
                {Math.round(
                  (USAGE.apiCalls.used / USAGE.apiCalls.quota) * 100
                )}
                %)
              </span>
            </div>
            <Progress
              value={(USAGE.apiCalls.used / USAGE.apiCalls.quota) * 100}
              className="h-2"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>{USAGE.reportExports.label}</span>
              <span className="text-muted-foreground">
                {USAGE.reportExports.used} / {USAGE.reportExports.quota}
              </span>
            </div>
            <Progress
              value={(USAGE.reportExports.used / USAGE.reportExports.quota) * 100}
              className="h-2"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>{USAGE.teamSeats.label}</span>
              <span className="text-muted-foreground">
                {USAGE.teamSeats.used} / {USAGE.teamSeats.quota}
              </span>
            </div>
            <Progress
              value={(USAGE.teamSeats.used / USAGE.teamSeats.quota) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(inv.date)}
                  </TableCell>
                  <TableCell>
                    {inv.amount} {inv.currency}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        inv.status === "paid"
                          ? "default"
                          : inv.status === "overdue"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleDownload(inv.id)}
                    >
                      <RiDownloadLine className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

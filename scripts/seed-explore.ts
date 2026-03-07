/**
 * Seed script for Explore module — writes mock district data to Firestore.
 * Run with: pnpm exec tsx scripts/seed-explore.ts
 *
 * Requires Firebase env vars (from .env.local):
 *   NEXT_PUBLIC_FIREBASE_* (apiKey, authDomain, projectId, etc.)
 *
 * Or run with: node --env-file=.env.local --import tsx scripts/seed-explore.ts
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { DISTRICTS } from "../lib/mock/explore-data"

function loadEnv() {
  const paths = [
    resolve(process.cwd(), ".env.local"),
    resolve(process.cwd(), ".env"),
  ]
  for (const p of paths) {
    if (existsSync(p)) {
      const content = readFileSync(p, "utf-8")
      for (const line of content.split("\n")) {
        const match = line.match(/^([^#=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          const val = match[2].trim().replace(/^["']|["']$/g, "")
          if (!process.env[key]) process.env[key] = val
        }
      }
      return
    }
  }
}

loadEnv()

async function seed() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  if (!config.apiKey || !config.projectId) {
    console.error(
      "Missing Firebase config. Set NEXT_PUBLIC_FIREBASE_* in .env.local"
    )
    process.exit(1)
  }

  const app = initializeApp(config)
  const db = getFirestore(app)

  const collection = "explore_districts"

  for (const district of DISTRICTS) {
    const ref = doc(db, collection, district.id)
    await setDoc(ref, {
      id: district.id,
      name: district.name,
      polygon: district.polygon,
      avgDailyFootfall: district.avgDailyFootfall,
      peakHour: district.peakHour,
      trend: district.trend,
      peakHours: district.peakHours,
      dayOfWeek: district.dayOfWeek,
      demographics: district.demographics,
      dwellTime: district.dwellTime,
      visitorOrigin: district.visitorOrigin,
      trendLine: district.trendLine,
      footfallDensity: district.footfallDensity,
      demographicHeat: district.demographicHeat,
      incomeZone: district.incomeZone,
      tourismActivity: district.tourismActivity,
      competitorDensity: district.competitorDensity,
    })
    console.log(`Seeded: ${district.name} (${district.id})`)
  }

  console.log(`Done. ${DISTRICTS.length} districts written to ${collection}.`)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

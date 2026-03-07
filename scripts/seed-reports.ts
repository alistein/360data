/**
 * Seed script for Reports module — writes mock data to Firestore.
 * Run with: pnpm exec tsx scripts/seed-reports.ts
 *
 * Requires Firebase env vars (from .env.local):
 *   NEXT_PUBLIC_FIREBASE_* (apiKey, authDomain, projectId, etc.)
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import {
  GENERATED_REPORTS,
  SCHEDULED_REPORTS,
} from "../lib/mock/reports-data"

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

  for (const report of GENERATED_REPORTS) {
    const ref = doc(db, "report_history", report.id)
    await setDoc(ref, report)
    console.log(`Seeded report: ${report.title}`)
  }

  for (const schedule of SCHEDULED_REPORTS) {
    const ref = doc(db, "report_scheduled", schedule.id)
    await setDoc(ref, schedule)
    console.log(`Seeded schedule: ${schedule.id}`)
  }

  console.log(
    `Done. ${GENERATED_REPORTS.length} reports, ${SCHEDULED_REPORTS.length} schedules.`
  )
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

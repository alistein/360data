/**
 * Seed script for Management module — writes mock data to Firestore.
 * Run with: pnpm exec tsx scripts/seed-management.ts
 *
 * Requires Firebase env vars (from .env.local):
 *   NEXT_PUBLIC_FIREBASE_* (apiKey, authDomain, projectId, etc.)
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import {
  TEAM_MEMBERS,
  INVOICES,
  TEAM_API_KEYS,
  NOTIFICATION_RULES,
  AUDIT_LOG,
  DATA_PREFERENCES,
} from "../lib/mock/management-data"

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

  for (const member of TEAM_MEMBERS) {
    const ref = doc(db, "mgmt_team_members", member.id)
    await setDoc(ref, member)
    console.log(`Seeded team member: ${member.name}`)
  }

  for (const invoice of INVOICES) {
    const ref = doc(db, "mgmt_invoices", invoice.id)
    await setDoc(ref, invoice)
    console.log(`Seeded invoice: ${invoice.id}`)
  }

  for (const key of TEAM_API_KEYS) {
    const ref = doc(db, "mgmt_api_keys", key.id)
    await setDoc(ref, key)
    console.log(`Seeded API key: ${key.label}`)
  }

  for (const rule of NOTIFICATION_RULES) {
    const ref = doc(db, "mgmt_notification_rules", rule.id)
    await setDoc(ref, rule)
    console.log(`Seeded notification rule: ${rule.trigger}`)
  }

  for (const entry of AUDIT_LOG) {
    const ref = doc(db, "mgmt_audit_log", entry.id)
    await setDoc(ref, entry)
  }
  console.log(`Seeded ${AUDIT_LOG.length} audit log entries`)

  const prefsRef = doc(db, "mgmt_data_preferences", "default")
  await setDoc(prefsRef, DATA_PREFERENCES)
  console.log("Seeded data preferences")

  console.log(
    `Done. ${TEAM_MEMBERS.length} team members, ${INVOICES.length} invoices, ` +
      `${TEAM_API_KEYS.length} API keys, ${NOTIFICATION_RULES.length} notification rules, ` +
      `${AUDIT_LOG.length} audit entries, 1 preferences doc.`
  )
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

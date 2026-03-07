/**
 * Mock data for the Management module — user management, billing, API keys overview,
 * notifications, audit log, and data preferences.
 * All data is fictional for demo/interview purposes.
 */

export type TeamRole = "Viewer" | "Analyst" | "Admin"

export type MemberStatus = "active" | "invited"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamRole
  lastActive: string | null
  status: MemberStatus
}

export interface Invoice {
  id: string
  date: string
  amount: number
  currency: string
  status: "paid" | "pending" | "overdue"
  downloadUrl?: string
}

export interface TeamApiKey {
  id: string
  owner: string
  label: string
  environment: "sandbox" | "production"
  lastUsed: string | null
  prefix: string
}

export type NotificationTrigger =
  | "quota_80"
  | "report_ready"
  | "footfall_drop_20"

export type NotificationChannel = "email" | "webhook"

export interface NotificationRule {
  id: string
  trigger: NotificationTrigger
  channel: NotificationChannel
  target: string
  enabled: boolean
}

export interface AuditEntry {
  id: string
  user: string
  action: string
  resource: string
  timestamp: string
  ip: string
}

export interface DataPreferences {
  defaultLocation: string
  defaultDateRange: string
  defaultCurrency: string
  timezone: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Tofig Aliyev",
    email: "tofig@example.com",
    role: "Admin",
    lastActive: "2025-03-07T10:15:00Z",
    status: "active",
  },
  {
    id: "tm-2",
    name: "Aysel Mammadova",
    email: "aysel@example.com",
    role: "Analyst",
    lastActive: "2025-03-07T09:42:00Z",
    status: "active",
  },
  {
    id: "tm-3",
    name: "Rashad Huseynov",
    email: "rashad@example.com",
    role: "Analyst",
    lastActive: "2025-03-06T16:30:00Z",
    status: "active",
  },
  {
    id: "tm-4",
    name: "Leyla Karimova",
    email: "leyla@example.com",
    role: "Viewer",
    lastActive: "2025-03-05T14:20:00Z",
    status: "active",
  },
  {
    id: "tm-5",
    name: "Elvin Ismayilov",
    email: "elvin@example.com",
    role: "Viewer",
    lastActive: null,
    status: "invited",
  },
  {
    id: "tm-6",
    name: "Nigar Abbasova",
    email: "nigar@example.com",
    role: "Analyst",
    lastActive: "2025-03-07T08:00:00Z",
    status: "active",
  },
]

export const INVOICES: Invoice[] = [
  { id: "inv-1", date: "2025-03-01", amount: 299, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-2", date: "2025-02-01", amount: 299, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-3", date: "2025-01-01", amount: 299, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-4", date: "2024-12-01", amount: 299, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-5", date: "2024-11-01", amount: 199, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-6", date: "2024-10-01", amount: 199, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-7", date: "2024-09-01", amount: 99, currency: "AZN", status: "paid", downloadUrl: "#" },
  { id: "inv-8", date: "2024-08-01", amount: 99, currency: "AZN", status: "paid", downloadUrl: "#" },
]

export const TEAM_API_KEYS: TeamApiKey[] = [
  { id: "tak-1", owner: "Tofig Aliyev", label: "Production Main", environment: "production", lastUsed: "2025-03-07T14:32:00Z", prefix: "sk_live_••••1a3f" },
  { id: "tak-2", owner: "Tofig Aliyev", label: "Sandbox Testing", environment: "sandbox", lastUsed: "2025-03-05T11:20:00Z", prefix: "sk_test_••••7b2e" },
  { id: "tak-3", owner: "Aysel Mammadova", label: "Analytics Pipeline", environment: "production", lastUsed: "2025-03-07T08:15:00Z", prefix: "sk_live_••••9c4d" },
  { id: "tak-4", owner: "Aysel Mammadova", label: "Report Export", environment: "production", lastUsed: "2025-03-06T17:00:00Z", prefix: "sk_live_••••2f8b" },
  { id: "tak-5", owner: "Rashad Huseynov", label: "Campaign API", environment: "production", lastUsed: "2025-03-06T12:45:00Z", prefix: "sk_live_••••4e1c" },
  { id: "tak-6", owner: "Rashad Huseynov", label: "Dev Sandbox", environment: "sandbox", lastUsed: "2025-03-04T09:30:00Z", prefix: "sk_test_••••5d3a" },
  { id: "tak-7", owner: "Leyla Karimova", label: "Read-only", environment: "production", lastUsed: "2025-03-05T14:20:00Z", prefix: "sk_live_••••6b9e" },
  { id: "tak-8", owner: "Nigar Abbasova", label: "ETL Jobs", environment: "production", lastUsed: "2025-03-07T07:00:00Z", prefix: "sk_live_••••8c2f" },
  { id: "tak-9", owner: "Nigar Abbasova", label: "Backup Key", environment: "production", lastUsed: null, prefix: "sk_live_••••1e4a" },
  { id: "tak-10", owner: "Tofig Aliyev", label: "Legacy Integration", environment: "production", lastUsed: null, prefix: "sk_live_••••2e8a" },
]

export const NOTIFICATION_RULES: NotificationRule[] = [
  {
    id: "nr-1",
    trigger: "quota_80",
    channel: "email",
    target: "admin@example.com",
    enabled: true,
  },
  {
    id: "nr-2",
    trigger: "report_ready",
    channel: "email",
    target: "reports@example.com",
    enabled: true,
  },
  {
    id: "nr-3",
    trigger: "footfall_drop_20",
    channel: "webhook",
    target: "https://api.example.com/alerts/footfall",
    enabled: true,
  },
  {
    id: "nr-4",
    trigger: "quota_80",
    channel: "webhook",
    target: "https://hooks.slack.com/services/xxx",
    enabled: false,
  },
]

export const AUDIT_LOG: AuditEntry[] = [
  { id: "al-1", user: "Tofig Aliyev", action: "Logged in", resource: "Auth", timestamp: "2025-03-07T10:15:00Z", ip: "192.168.1.10" },
  { id: "al-2", user: "Aysel Mammadova", action: "Logged in", resource: "Auth", timestamp: "2025-03-07T09:42:00Z", ip: "192.168.1.22" },
  { id: "al-3", user: "Tofig Aliyev", action: "Revoked API key", resource: "Legacy Integration", timestamp: "2025-03-07T09:30:00Z", ip: "192.168.1.10" },
  { id: "al-4", user: "Nigar Abbasova", action: "Downloaded report", resource: "Retail Site Report - Nizami", timestamp: "2025-03-07T08:45:00Z", ip: "192.168.1.45" },
  { id: "al-5", user: "Rashad Huseynov", action: "Created API key", resource: "Campaign API", timestamp: "2025-03-06T16:20:00Z", ip: "192.168.1.33" },
  { id: "al-6", user: "Leyla Karimova", action: "Viewed district", resource: "Nizami", timestamp: "2025-03-06T15:10:00Z", ip: "192.168.1.18" },
  { id: "al-7", user: "Tofig Aliyev", action: "Updated settings", resource: "Data Preferences", timestamp: "2025-03-06T14:00:00Z", ip: "192.168.1.10" },
  { id: "al-8", user: "Aysel Mammadova", action: "Exported audience", resource: "Campaign - Narimanov", timestamp: "2025-03-06T13:30:00Z", ip: "192.168.1.22" },
  { id: "al-9", user: "Nigar Abbasova", action: "Scheduled report", resource: "Tourism Flow Report", timestamp: "2025-03-06T12:00:00Z", ip: "192.168.1.45" },
  { id: "al-10", user: "Tofig Aliyev", action: "Invited team member", resource: "elvin@example.com", timestamp: "2025-03-05T11:00:00Z", ip: "192.168.1.10" },
  { id: "al-11", user: "Rashad Huseynov", action: "Changed role", resource: "Leyla Karimova → Viewer", timestamp: "2025-03-05T10:15:00Z", ip: "192.168.1.33" },
  { id: "al-12", user: "Aysel Mammadova", action: "Logged in", resource: "Auth", timestamp: "2025-03-05T09:00:00Z", ip: "192.168.1.22" },
  { id: "al-13", user: "Tofig Aliyev", action: "Upgraded plan", resource: "Starter → Business", timestamp: "2025-03-04T16:00:00Z", ip: "192.168.1.10" },
  { id: "al-14", user: "Leyla Karimova", action: "Downloaded report", resource: "Branch Optimisation Report", timestamp: "2025-03-04T14:30:00Z", ip: "192.168.1.18" },
  { id: "al-15", user: "Nigar Abbasova", action: "Created webhook", resource: "footfall.threshold", timestamp: "2025-03-04T11:20:00Z", ip: "192.168.1.45" },
  { id: "al-16", user: "Rashad Huseynov", action: "Logged in", resource: "Auth", timestamp: "2025-03-04T08:45:00Z", ip: "192.168.1.33" },
  { id: "al-17", user: "Tofig Aliyev", action: "Rotated API key", resource: "Production Main", timestamp: "2025-03-03T15:00:00Z", ip: "192.168.1.10" },
  { id: "al-18", user: "Aysel Mammadova", action: "Generated report", resource: "Retail Site Report", timestamp: "2025-03-03T12:00:00Z", ip: "192.168.1.22" },
  { id: "al-19", user: "Leyla Karimova", action: "Logged in", resource: "Auth", timestamp: "2025-03-03T10:00:00Z", ip: "192.168.1.18" },
  { id: "al-20", user: "Nigar Abbasova", action: "Updated notification", resource: "quota_80 alert", timestamp: "2025-03-02T17:30:00Z", ip: "192.168.1.45" },
  { id: "al-21", user: "Tofig Aliyev", action: "Removed team member", resource: "old.user@example.com", timestamp: "2025-03-02T14:00:00Z", ip: "192.168.1.10" },
  { id: "al-22", user: "Rashad Huseynov", action: "Exported to Meta Ads", resource: "Audience - Yasamal", timestamp: "2025-03-02T11:00:00Z", ip: "192.168.1.33" },
  { id: "al-23", user: "Aysel Mammadova", action: "Logged in", resource: "Auth", timestamp: "2025-03-02T09:00:00Z", ip: "192.168.1.22" },
  { id: "al-24", user: "Tofig Aliyev", action: "Downloaded invoice", resource: "inv-2", timestamp: "2025-03-01T16:00:00Z", ip: "192.168.1.10" },
  { id: "al-25", user: "Nigar Abbasova", action: "Viewed audit log", resource: "Audit Log", timestamp: "2025-03-01T14:00:00Z", ip: "192.168.1.45" },
  { id: "al-26", user: "Leyla Karimova", action: "Logged in", resource: "Auth", timestamp: "2025-03-01T10:30:00Z", ip: "192.168.1.18" },
  { id: "al-27", user: "Rashad Huseynov", action: "Created audience", resource: "Nizami 25-34", timestamp: "2025-02-28T15:00:00Z", ip: "192.168.1.33" },
  { id: "al-28", user: "Tofig Aliyev", action: "Updated billing", resource: "Payment method", timestamp: "2025-02-28T12:00:00Z", ip: "192.168.1.10" },
  { id: "al-29", user: "Aysel Mammadova", action: "Logged in", resource: "Auth", timestamp: "2025-02-28T09:00:00Z", ip: "192.168.1.22" },
  { id: "al-30", user: "Nigar Abbasova", action: "Revoked API key", resource: "Old ETL Key", timestamp: "2025-02-27T11:00:00Z", ip: "192.168.1.45" },
]

export const DATA_PREFERENCES: DataPreferences = {
  defaultLocation: "baku",
  defaultDateRange: "last_30",
  defaultCurrency: "AZN",
  timezone: "Asia/Baku",
}

export const LOCATION_OPTIONS = [
  { value: "baku", label: "Baku" },
  { value: "nizami", label: "Nizami District" },
  { value: "nasimi", label: "Nasimi District" },
  { value: "narimanov", label: "Narimanov District" },
  { value: "sabail", label: "Sabail District" },
  { value: "khatai", label: "Khatai District" },
  { value: "yasamal", label: "Yasamal District" },
  { value: "binagadi", label: "Binagadi District" },
  { value: "surakhani", label: "Surakhani District" },
]

export const DATE_RANGE_OPTIONS = [
  { value: "last_7", label: "Last 7 days" },
  { value: "last_30", label: "Last 30 days" },
  { value: "last_90", label: "Last 90 days" },
  { value: "last_year", label: "Last Year" },
]

export const CURRENCY_OPTIONS = [
  { value: "AZN", label: "AZN" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
]

export const TIMEZONE_OPTIONS = [
  { value: "Asia/Baku", label: "Asia/Baku" },
  { value: "UTC", label: "UTC" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "America/New_York", label: "America/New_York" },
]

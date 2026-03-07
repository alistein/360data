/**
 * Mock data for the Developer Hub module — API keys, usage, webhooks, changelog, endpoints.
 * All data is fictional for demo/interview purposes.
 */

export interface ApiKey {
  id: string
  name: string
  key: string
  environment: "sandbox" | "production"
  project: string
  createdAt: string
  lastUsed: string | null
  status: "active" | "revoked"
}

export interface UsageStats {
  dailyCalls: { date: string; calls: number }[]
  callsToday: number
  callsThisMonth: number
  quota: number
  avgLatencyMs: number
  errorRatePercent: number
  callsByEndpoint: { endpoint: string; calls: number }[]
}

export interface Webhook {
  id: string
  url: string
  event: string
  enabled: boolean
  lastTriggered: string | null
}

export interface ChangelogEntry {
  version: string
  date: string
  summary: string
  changes: string[]
}

export interface EndpointParameter {
  name: string
  type: string
  required: boolean
  description: string
}

export interface Endpoint {
  id: string
  method: string
  path: string
  description: string
  parameters: EndpointParameter[]
  exampleResponse: unknown
  codeSnippets?: {
    python: string
    javascript: string
    curl: string
  }
}

export const API_KEYS: ApiKey[] = [
  {
    id: "key-1",
    name: "Production Main",
    key: "sk_live_••••••••••••1a3f",
    environment: "production",
    project: "360data Dashboard",
    createdAt: "2024-11-15T10:00:00Z",
    lastUsed: "2025-03-06T14:32:00Z",
    status: "active",
  },
  {
    id: "key-2",
    name: "Sandbox Testing",
    key: "sk_test_••••••••••••7b2e",
    environment: "sandbox",
    project: "Dev Environment",
    createdAt: "2024-12-01T09:00:00Z",
    lastUsed: "2025-03-05T11:20:00Z",
    status: "active",
  },
  {
    id: "key-3",
    name: "Analytics Pipeline",
    key: "sk_live_••••••••••••9c4d",
    environment: "production",
    project: "ETL Jobs",
    createdAt: "2024-10-20T14:00:00Z",
    lastUsed: "2025-03-07T08:15:00Z",
    status: "active",
  },
  {
    id: "key-4",
    name: "Legacy Integration",
    key: "sk_live_••••••••••••2e8a",
    environment: "production",
    project: "Legacy System",
    createdAt: "2024-08-10T12:00:00Z",
    lastUsed: null,
    status: "revoked",
  },
]

function generateDailyCalls(): { date: string; calls: number }[] {
  const result: { date: string; calls: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const calls = Math.floor(800 + Math.random() * 1200 + Math.sin(i * 0.3) * 200)
    result.push({ date: dateStr, calls })
  }
  return result
}

export const USAGE_STATS: UsageStats = {
  dailyCalls: generateDailyCalls(),
  callsToday: 1247,
  callsThisMonth: 28450,
  quota: 100000,
  avgLatencyMs: 142,
  errorRatePercent: 0.3,
  callsByEndpoint: [
    { endpoint: "GET /districts", calls: 12500 },
    { endpoint: "GET /footfall", calls: 8200 },
    { endpoint: "GET /reports", calls: 4200 },
    { endpoint: "POST /webhooks", calls: 2100 },
    { endpoint: "GET /health", calls: 1450 },
  ],
}

export const WEBHOOKS: Webhook[] = [
  {
    id: "wh-1",
    url: "https://api.example.com/webhooks/footfall",
    event: "footfall.threshold",
    enabled: true,
    lastTriggered: "2025-03-07T09:45:00Z",
  },
  {
    id: "wh-2",
    url: "https://hooks.slack.com/services/xxx/yyy/zzz",
    event: "district.update",
    enabled: true,
    lastTriggered: "2025-03-06T16:20:00Z",
  },
  {
    id: "wh-3",
    url: "https://internal.example.com/reports",
    event: "report.ready",
    enabled: false,
    lastTriggered: "2025-02-28T11:00:00Z",
  },
]

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2025-03-01",
    summary: "Webhook retry policy and rate limit headers",
    changes: [
      "Added exponential backoff for webhook delivery failures (max 5 retries)",
      "Response headers now include X-RateLimit-Limit and X-RateLimit-Remaining",
      "New optional ?include=metadata query param for GET /districts",
    ],
  },
  {
    version: "2.3.2",
    date: "2025-02-15",
    summary: "Bug fixes and performance improvements",
    changes: [
      "Fixed pagination cursor handling for large result sets",
      "Reduced average latency by 15% for footfall aggregation queries",
      "Deprecated legacy date format (YYYYMMDD) in favor of ISO 8601",
    ],
  },
  {
    version: "2.3.0",
    date: "2025-02-01",
    summary: "Bulk export and webhook enhancements",
    changes: [
      "New POST /exports endpoint for async bulk data export",
      "Webhook payloads now include request_id for idempotency",
      "Added district.update event for boundary changes",
    ],
  },
  {
    version: "2.2.0",
    date: "2025-01-15",
    summary: "Report scheduling and API key scopes",
    changes: [
      "Scheduled reports can be configured via POST /reports/schedule",
      "API keys support optional scope restrictions (read-only, write)",
      "Improved error messages with actionable suggestions",
    ],
  },
  {
    version: "2.1.0",
    date: "2024-12-20",
    summary: "Footfall threshold webhooks",
    changes: [
      "New footfall.threshold webhook event when daily footfall exceeds configured limit",
      "GET /footfall now accepts district_ids as comma-separated list",
      "Sandbox environment rate limit increased to 1000 req/min",
    ],
  },
  {
    version: "2.0.0",
    date: "2024-12-01",
    summary: "Major API overhaul",
    changes: [
      "Breaking: All endpoints now require API key in Authorization header",
      "New v2 base path: /api/v2 (v1 deprecated, EOL March 2025)",
      "Unified error response format with code, message, and details",
    ],
  },
]

const exampleDistrictResponse = {
  data: [
    { id: "nizami", name: "Nizami", population: 184200, area_km2: 20.1 },
    { id: "yasamal", name: "Yasamal", population: 156800, area_km2: 29.5 },
  ],
  meta: { total: 12, page: 1, per_page: 10 },
}

const exampleFootfallResponse = {
  district_id: "nizami",
  date: "2025-03-07",
  hourly: [120, 340, 520, 890, 1200, 1850, 2100, 1950, 1680, 1420, 980, 450],
  total: 12500,
}

const exampleReportResponse = {
  id: "rpt_abc123",
  status: "completed",
  download_url: "https://cdn.example.com/reports/rpt_abc123.pdf",
  created_at: "2025-03-07T10:00:00Z",
}

const exampleHealthResponse = {
  status: "ok",
  version: "2.4.0",
  timestamp: "2025-03-07T12:00:00Z",
}

const exampleWebhookResponse = {
  id: "wh_new123",
  url: "https://example.com/webhook",
  event: "footfall.threshold",
  enabled: true,
  created_at: "2025-03-07T12:00:00Z",
}

export const ENDPOINTS: Endpoint[] = [
  {
    id: "districts",
    method: "GET",
    path: "/api/v2/districts",
    description: "List all districts with optional filtering and pagination.",
    parameters: [
      { name: "page", type: "integer", required: false, description: "Page number (default: 1)" },
      { name: "per_page", type: "integer", required: false, description: "Items per page (default: 10, max: 100)" },
      { name: "include", type: "string", required: false, description: "Comma-separated: metadata, boundaries" },
    ],
    exampleResponse: exampleDistrictResponse,
    codeSnippets: {
      python: `import requests

response = requests.get(
    "https://api.360data.az/v2/districts",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"per_page": 10}
)
print(response.json())`,
      javascript: `const response = await fetch(
  "https://api.360data.az/v2/districts?per_page=10",
  {
    headers: { Authorization: "Bearer YOUR_API_KEY" },
  }
);
const data = await response.json();
console.log(data);`,
      curl: `curl -X GET "https://api.360data.az/v2/districts?per_page=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
  },
  {
    id: "footfall",
    method: "GET",
    path: "/api/v2/footfall",
    description: "Retrieve footfall data for a district and date range.",
    parameters: [
      { name: "district_id", type: "string", required: true, description: "District identifier" },
      { name: "date", type: "string", required: true, description: "Date in ISO format (YYYY-MM-DD)" },
      { name: "granularity", type: "string", required: false, description: "hourly | daily (default: daily)" },
    ],
    exampleResponse: exampleFootfallResponse,
    codeSnippets: {
      python: `import requests

response = requests.get(
    "https://api.360data.az/v2/footfall",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"district_id": "nizami", "date": "2025-03-07"}
)
print(response.json())`,
      javascript: `const response = await fetch(
  "https://api.360data.az/v2/footfall?district_id=nizami&date=2025-03-07",
  { headers: { Authorization: "Bearer YOUR_API_KEY" } }
);
const data = await response.json();
console.log(data);`,
      curl: `curl -X GET "https://api.360data.az/v2/footfall?district_id=nizami&date=2025-03-07" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
  },
  {
    id: "reports",
    method: "GET",
    path: "/api/v2/reports/{id}",
    description: "Get report status and download URL by report ID.",
    parameters: [
      { name: "id", type: "string", required: true, description: "Report ID (path parameter)" },
    ],
    exampleResponse: exampleReportResponse,
    codeSnippets: {
      python: `import requests

response = requests.get(
    "https://api.360data.az/v2/reports/rpt_abc123",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)
print(response.json())`,
      javascript: `const response = await fetch(
  "https://api.360data.az/v2/reports/rpt_abc123",
  { headers: { Authorization: "Bearer YOUR_API_KEY" } }
);
const data = await response.json();
console.log(data);`,
      curl: `curl -X GET "https://api.360data.az/v2/reports/rpt_abc123" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
  },
  {
    id: "health",
    method: "GET",
    path: "/api/v2/health",
    description: "Check API health and version. No authentication required.",
    parameters: [],
    exampleResponse: exampleHealthResponse,
    codeSnippets: {
      python: `import requests

response = requests.get("https://api.360data.az/v2/health")
print(response.json())`,
      javascript: `const response = await fetch("https://api.360data.az/v2/health");
const data = await response.json();
console.log(data);`,
      curl: `curl -X GET "https://api.360data.az/v2/health"`,
    },
  },
  {
    id: "webhooks",
    method: "POST",
    path: "/api/v2/webhooks",
    description: "Register a new webhook endpoint.",
    parameters: [
      { name: "url", type: "string", required: true, description: "Webhook URL" },
      { name: "event", type: "string", required: true, description: "Event type (footfall.threshold, district.update, report.ready)" },
      { name: "secret", type: "string", required: false, description: "Optional signing secret for HMAC verification" },
    ],
    exampleResponse: exampleWebhookResponse,
    codeSnippets: {
      python: `import requests

response = requests.post(
    "https://api.360data.az/v2/webhooks",
    headers={"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"},
    json={"url": "https://example.com/webhook", "event": "footfall.threshold"}
)
print(response.json())`,
      javascript: `const response = await fetch("https://api.360data.az/v2/webhooks", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com/webhook",
    event: "footfall.threshold",
  }),
});
const data = await response.json();
console.log(data);`,
      curl: `curl -X POST "https://api.360data.az/v2/webhooks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com/webhook","event":"footfall.threshold"}'`,
    },
  },
]

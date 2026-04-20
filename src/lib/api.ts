/**
 * AllAstro — Typed API Client
 *
 * All request/response types come from ./api-types so field names
 * are validated at compile time against the shared contract.
 */

import type {
  BirthData,
  KundliResponse,
  NumerologyRequest,
  NumerologyResponse,
  TarotDrawRequest,
  TarotDrawResponse,
  TarotReadingRequest,
  OracleChatRequest,
  OracleChunk,
} from './api-types'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
}

// ── Kundli ────────────────────────────────────────────────────────────────────

export async function generateKundli(data: BirthData): Promise<KundliResponse | null> {
  try {
    const res = await apiFetch('/api/v1/kundli/generate', {
      method: 'POST',
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15_000),
    })
    if (res.ok) return res.json()
  } catch { /* offline/unavailable */ }
  return null
}

// ── Numerology ────────────────────────────────────────────────────────────────

export async function calculateNumerology(req: NumerologyRequest): Promise<NumerologyResponse | null> {
  try {
    const res = await apiFetch('/api/v1/numerology/calculate', {
      method: 'POST',
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(5_000),
    })
    if (res.ok) return res.json()
  } catch { }
  return null
}

// ── Tarot ─────────────────────────────────────────────────────────────────────

export async function drawTarotCards(req: TarotDrawRequest): Promise<TarotDrawResponse | null> {
  try {
    const res = await apiFetch('/api/v1/tarot/draw', {
      method: 'POST',
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(5_000),
    })
    if (res.ok) return res.json()
  } catch { }
  return null
}

export async function getTarotReading(req: TarotReadingRequest): Promise<string | null> {
  try {
    const res = await apiFetch('/api/v1/tarot/reading', {
      method: 'POST',
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(10_000),
    })
    if (res.ok) {
      const data = await res.json()
      return data.reading?.interpretation ?? data.interpretation ?? null
    }
  } catch { }
  return null
}

// ── Oracle streaming ──────────────────────────────────────────────────────────

export async function streamOracle(
  req: OracleChatRequest,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
): Promise<void> {
  try {
    const res = await apiFetch('/api/v1/oracle/chat', {
      method: 'POST',
      body: JSON.stringify({ ...req, stream: true }),
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok || !res.body) { onError(`HTTP ${res.status}`); return }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        try {
          const chunk = JSON.parse(line.slice(6)) as OracleChunk
          if (chunk.type === 'text') onChunk(chunk.text)
          else if (chunk.type === 'done') onDone()
          else if (chunk.type === 'error') onError(chunk.error)
        } catch { /* skip malformed */ }
      }
    }
    onDone()
  } catch (e) {
    onError(e instanceof Error ? e.message : 'Oracle unavailable')
  }
}

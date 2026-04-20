import { z } from 'zod'

/**
 * AllAstro API Contract Types
 *
 * Single source of truth for all API request/response shapes.
 * Import these in components and service files — never use `any` for API data.
 *
 * Pattern:
 *   const FooSchema = z.object({ ... })
 *   type FooRequest = z.infer<typeof FooSchema>
 *   interface FooResponse { ... }
 */

// ── Common ───────────────────────────────────────────────────────────────────
export const BirthDataSchema = z.object({
  name: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})
export type BirthData = z.infer<typeof BirthDataSchema>

// ── Astrology / Kundli ───────────────────────────────────────────────────────
export interface KundliResponse {
  name: string
  ascendant: { rashiIndex: number; degree: number; nakshatraIndex: number }
  planets: Array<{
    name: string
    rashiIndex: number
    houseNumber: number
    degree: number
    isRetrograde: boolean
    dignity: 'Exalted' | 'Own' | 'Neutral' | 'Debilitated'
    nakshatraIndex: number
  }>
  yogas: Array<{ name: string; type: string; strength: string; description: string }>
  doshas: Array<{ name: string; severity: string; description: string }>
  dashas: {
    mahadashas: Array<{ planet: string; startDate: string; endDate: string; years: number }>
  }
}

// ── Numerology ───────────────────────────────────────────────────────────────
export const NumerologyRequestSchema = z.object({
  fullName: z.string().min(1),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})
export type NumerologyRequest = z.infer<typeof NumerologyRequestSchema>

export interface NumerologyResponse {
  numbers: {
    lifePath: { value: number }
    expression: { value: number }
    soulUrge: { value: number }
    personality: { value: number }
    personalYear: { value: number }
    birthday: { value: number }
  }
}

// ── Tarot ────────────────────────────────────────────────────────────────────
export const TarotDrawRequestSchema = z.object({
  count: z.number().int().min(1).max(10),
  spreadType: z.enum(['single', 'three-card', 'five-card', 'celtic-cross', 'custom']),
  allowReversed: z.boolean().optional(),
})
export type TarotDrawRequest = z.infer<typeof TarotDrawRequestSchema>

export interface TarotCard {
  id: string
  name: string
  arcana: 'major' | 'minor'
  suit: string | null
  element: string
}
export interface TarotDrawResponse {
  cards: Array<{ card: TarotCard; position: string; isReversed: boolean }>
  spreadType: string
}

export const TarotReadingRequestSchema = z.object({
  cards: z.array(z.object({
    cardName: z.string(),
    position: z.string(),
    isReversed: z.boolean(),
  })),
  question: z.string().min(3).max(500),
  spreadType: z.string().optional(),
})
export type TarotReadingRequest = z.infer<typeof TarotReadingRequestSchema>

// ── Oracle / Chat ─────────────────────────────────────────────────────────────
export const OracleChatRequestSchema = z.object({
  query: z.string().min(1),
  sessionId: z.string().optional(),
  stream: z.boolean().optional(),
})
export type OracleChatRequest = z.infer<typeof OracleChatRequestSchema>

// SSE chunk shape
export interface OracleTextChunk { type: 'text'; text: string; done: boolean }
export interface OracleErrorChunk { type: 'error'; error: string }
export type OracleChunk = OracleTextChunk | OracleErrorChunk

# Quality Guardrails — Binding Policy

Claude: apply this file to every output, in every process. Reliability is the
#2 success factor in `monetization/strategies-2026.md` — customers pay more
for agents that don't hallucinate or fail, and one bad deliverable costs more
than ten good ones earn. These rules outrank speed.

## Risk tiers — every output gets one

| Tier | What | Gate before it leaves the building |
| ---- | ---- | ---------------------------------- |
| T1 — Internal | Briefs, plans, research, analysis for me | None; flag low-confidence claims inline |
| T2 — Customer-facing | Outreach, content, posts, reports, deliverables | My review seat: full read + checklist below |
| T3 — High-stakes | Legal/medical/financial/safety-adjacent, pricing promises, anything with liability | Double pass (self-verify step) + my line-by-line review + disclaimer + expert referral path where relevant |

Claude labels the tier at the top of every draft. When in doubt between two
tiers, take the higher one.

## Anti-hallucination rules (all tiers)

1. **No invented specifics — ever.** Prices, statistics, names, dates,
   features, quotes, credentials: if it wasn't in my input or a verifiable
   source, it doesn't appear. Placeholder `[VERIFY: ...]` instead.
2. **Cite or flag.** Factual claims in customer-facing work carry their
   source (page, clause, URL, "client said on [date]") or an explicit
   `[UNVERIFIED]` tag for my review.
3. **Confidence labels** on analysis: "clear signal" / "likely" / "worth
   watching" — never uniform confidence.
4. **Grounding for customer-facing agents** (chatbots, receptionists, doc
   tools): answer only from the provided knowledge base; otherwise offer the
   human handoff. No guessing prices, availability, policy, or safety info.
5. **Quotes are sacred.** Voice-of-customer quotes and document extractions
   are verbatim with attribution — paraphrase is labeled as paraphrase.

## Review-seat checklist (T2/T3 — I run this, ~2 min per item)

- [ ] Facts: every specific checked against source; no `[VERIFY]` tags left
- [ ] Voice: sounds like me/the client, not like a model
- [ ] Promise check: nothing commits me to scope, timing, or results I
      haven't agreed to
- [ ] Audience test: would the recipient's smartest colleague find this
      credible?
- [ ] T3 only: disclaimer present, edge cases flagged, "consult a
      professional" path included

## Eval sets — the regression tests for prompts

- Every production pipeline keeps an eval set: **20+ real past cases with
  approved "golden" outputs** (start collecting from delivery #1).
- Before ANY prompt/process change ships, re-run the eval set; a change that
  degrades ≥2 cases is rejected or the golden set is consciously updated.
- Autopilot Friday runs sample 3 random eval cases against the current
  prompts and report drift in `state/inbox.md`.

## Prompts are code

- Production prompts live in the process files under version headers
  (`v1.2 — 2026-07-03 — tightened tone rules`), with a one-line changelog.
- A quality dip after a change → roll back first, diagnose second.
- Model routing changes (strong → cheap model on a step) require an eval-set
  pass just like prompt changes.

## Quality metrics (added to the Friday scoreboard)

| Metric | Yellow | Red — act now |
| ------ | ------ | ------------- |
| Correction rate (edits I make in review) | >20% of items | >40% — fix the prompt, not the outputs |
| Defect escapes (errors a customer saw) | 1/month | 2+/month — pause automation on that pipeline, return to manual |
| Redo/refund requests | 1/month | >5% of deliveries |
| Eval drift (Friday sample failures) | 1 of 3 | 2+ of 3 — roll back last change |

## Incident process (a defect reached a customer)

1. **Own it fast:** same-day message — what was wrong, corrected version,
   what we changed. No excuses, no blaming "the AI."
2. **Make it right:** redo free + goodwill gesture sized to the harm.
3. **Root-cause with Claude:** which step let it through — input, prompt,
   QA pass, or my review? Fix the STEP, add the case to the eval set.
4. **Log it** in `04-decision-log.md`. Two incidents from the same step =
   that pipeline drops back one automation level until it re-earns it.

## Idea-specific hot spots (extra care beyond the tiers)

- **#13 contracts / #12 careers:** T3 always; nothing inflated or invented
  in a resume, no legal conclusions — flags and questions only.
- **#15 receptionist:** emergency escalation tested monthly; missed
  emergency = automatic incident.
- **#8 documents / #18 analytics:** every extracted figure re-verified
  against source before delivery; "why" claims are my call.
- **Safety niches (mushrooms, herbalism, seniors):** educational framing,
  hard refusal on edibility/dosage/medical verdicts, expert referral built
  into the product.

## The meta-rule

Quality problems are process problems. If my review keeps catching the same
class of error, the fix goes into the process file and the eval set — the
review seat is a gate, not a repair shop.

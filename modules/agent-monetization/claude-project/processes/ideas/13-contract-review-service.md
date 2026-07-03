# Process: AI Legal / Contract Review (First-Pass)

**Idea #13** · **Monetization:** pay-per-document + monthly plans ·
**Time to first revenue:** 3–6 weeks · **Weekly hours:** 8–12

## Snapshot

Plain-English first-pass contract review for people who can't justify a
lawyer for every document: freelancers reviewing client agreements, creators
reading brand deals, small landlords, first-time commercial tenants. The
product is understanding + risk flags, explicitly NOT legal advice.

**Pros:** high willingness to pay at signing moments, underserved segment,
repeatable document types.
**Cons:** liability exposure — positioning and disclaimers are existential;
can't cross into practicing law; trust takes proof.
**Mitigations:** every output carries "educational review, not legal advice —
consult a licensed attorney for decisions"; scope to common document types
with a maintained checklist; partner with an actual lawyer for referral
handoffs (they get leads, I get legitimacy).

## Pipeline (per document)

1. **Intake:** document + context (who they are, what they're worried about,
   deal size).
2. **Clause map:** Claude produces a section-by-section plain-English
   explanation.
3. **Risk flags:** against the document-type checklist — unusual terms,
   one-sided clauses, missing protections (IP, kill fees, indemnity,
   auto-renewal, non-compete scope) — each with severity and "questions to
   ask the other party."
4. **Negotiation aid:** suggested talking points (not redlines) for the top
   3 flags.
5. **QA:** second pass verifying every flag quotes the actual clause text.
6. **Review seat:** I read every flagged clause myself; anything ambiguous
   or high-stakes → recommend the referral attorney. Disclaimer on every
   page.

## Weekly brief prompt

> Contract week: reviews delivered [N], revenue [$], document types seen
> [list]. Process any new intakes per pipeline. Then: update the checklist
> for [document type] with new patterns, and draft this week's 3 educational
> posts ("the clause that costs freelancers money", etc.) for [community].

## KPIs

- Reviews/week · revenue · turnaround time · repeat customers · referral-partner leads sent

## Pricing & offer

- Single review $49–99 (by length) · 24h rush +50% · Freelancer plan
  $29/mo (2 reviews) · Agency plan $99/mo (8).

## First 3 actions

1. Pick 2 document types (e.g., freelance service agreements + NDAs) and build their checklists.
2. Review 5 documents free for freelancer friends; collect testimonials.
3. Line up the referral attorney and finalize the disclaimer language.

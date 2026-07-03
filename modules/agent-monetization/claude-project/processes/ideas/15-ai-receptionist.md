# Process: AI Receptionist Service

**Idea #15** · **Monetization:** monthly subscription per business ·
**Time to first revenue:** 4–8 weeks · **Weekly hours:** 10–15

## Snapshot

After-hours and overflow call/message handling for local service businesses
(plumbers, clinics, salons): answer, qualify, book, escalate urgent cases.
Built on an existing voice-AI platform (Retell/Vapi/Bland or similar) — I sell,
configure, and manage; the platform provides telephony.

**Pros:** missed calls = missed revenue, so ROI is visceral; strong local
demand; sticky once installed; recurring.
**Cons:** voice integration complexity, latency/quality expectations, urgent
mis-routing is a real harm — escalation design matters; platform costs.
**Mitigations:** start with after-hours only (lower stakes, obvious value);
hard escalation rules (emergencies → immediate human transfer/SMS);
per-vertical script templates; weekly transcript audits.

## Pipeline (per client)

1. **Onboard:** services, prices they allow quoting, booking system, on-call
   escalation contacts, "never say" list → Claude builds the call script:
   greeting, qualification questions, booking flow, emergency triggers.
2. **Test:** 30 simulated calls incl. angry, emergency, and rambling callers;
   I listen before go-live.
3. **Weekly ops:** transcript audit — Claude summarizes all calls, flags
   mishandled ones, drafts script fixes; booking/lead report to client.
4. **Monthly report:** calls answered after-hours, bookings made, revenue
   captured estimate — the retention document.
5. **Review seat:** I approve every script change; emergencies routing is
   tested monthly; recording disclosures comply with local law.

## Weekly brief prompt

> Receptionist week: clients + transcript exports [paste]. Run audits per
> pipeline: per-client call summary, flagged calls with proposed script
> fixes, and reports due. Draft 5 pitches to [vertical] businesses — lead
> with "call your own business at 7pm; nobody answers; here's what that
> costs."

## KPIs

- Clients · MRR · calls handled · booking conversion · escalation accuracy (zero missed emergencies) · churn

## Pricing & offer

- $250/mo after-hours only · $500/mo 24/7 overflow · setup $300.
- Platform costs ~$0.10–0.30/min — priced in with margin.

## First 3 actions

1. Pick one vertical with urgent after-hours calls (plumbing/HVAC is the classic).
2. Build and battle-test one demo agent; record a "call it now" demo number.
3. Pitch 10 local businesses with the live demo number in the message.

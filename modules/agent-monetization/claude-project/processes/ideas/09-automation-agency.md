# Process: AI Automation Agency

**Idea #9** · **Monetization:** setup fee + monthly retainer ·
**Time to first revenue:** 3–6 weeks · **Weekly hours:** 15–20

## Snapshot

Build and maintain AI-powered automations for SMBs: lead follow-up, inbox
triage, report generation, data entry — glued together with Make/n8n/Zapier +
LLM steps. High-ticket because I sell recovered hours, not technology.

**Pros:** $1K–5K setups + retainers, huge demand, discovery calls basically
write the proposal.
**Cons:** custom work doesn't scale by default, scope creep, I'm on the hook
when automations break.
**Mitigations:** niche to one industry so builds become templates; fixed-scope
packages, change orders for extras; monitoring + retainer covers maintenance.

## Pipeline

1. **Discovery call:** run the script — map their workflow, hours spent,
   error cost. Claude turns my raw notes into a workflow map.
2. **Proposal:** Claude drafts from the template: current state → future
   state → hours saved/yr → package price → timeline. I adjust and send
   within 24h of the call.
3. **Build:** workflow design doc → I implement in n8n/Make; Claude writes
   the LLM-step prompts, error handling logic, and test cases.
4. **Handoff:** Loom-style walkthrough script, plain-English SOP for the
   client's team, escalation rules.
5. **Retainer ops (monthly):** check run logs, fix breakages, one
   improvement suggestion — Claude drafts the monthly value report ("your
   automations ran N times ≈ X hours saved").
6. **Review seat:** I test every automation against edge cases before
   handoff; anything touching customer data or money gets a human-approval
   step built in.

## Weekly brief prompt

> Agency week: pipeline [calls booked, proposals out], active builds
> [status], retainer clients [log summaries]. Draft: proposal for [call
> notes], this week's build plan, monthly reports due, and 5 outreach
> messages to [industry] leading with one specific automation and its
> hours-saved math.

## KPIs

- Discovery calls · proposal win rate · setup revenue · retainer MRR · automation uptime

## Pricing & offer

- Starter automation $1,500 · Workflow suite $3,500–5,000 · Retainer $300–1,000/mo.
- Productize the 3 most-requested builds into fixed-price packages by month 3.

## First 3 actions

1. Pick one industry and list its 3 most painful repetitive workflows.
2. Build one demo automation end-to-end and record a 2-minute walkthrough.
3. Book 5 discovery calls via network + niche communities using the demo.

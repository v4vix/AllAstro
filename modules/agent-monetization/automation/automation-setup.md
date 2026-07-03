# Automation Setup — Manual → Scheduled → Pipeline

Rule from the OS: **revenue before automation.** Automate a process only after
it has run manually ≥5 times and produced money. Then automate in levels —
each level must pay for itself in saved hours before advancing.

## Level 0 — Manual with Claude Projects (start here, week 1)

What you already have with this module:

- Claude Project with the core files + active idea's process file uploaded.
- You paste the daily/weekly prompts by hand.
- **Tips:** pin the weekly prompts somewhere one keystroke away (text
  expander: `;daily`, `;weekly`, `;review`). Keep ONE conversation per week,
  new conversation each Monday — context stays relevant, never bloated.
- Cost: your Claude subscription. Time saved vs no system: ~5 hrs/wk.

## Level 1 — Scheduled briefs with Claude Code (week 2+, zero extra tools)

Claude Code (CLI, desktop, or claude.ai/code) can run your OS on a schedule.

**Setup:**
1. Put this module's files in a git repo (they already are, if you're reading
   this in one) and add a `CLAUDE.md` at the root:
   ```markdown
   # CLAUDE.md
   Read modules/agent-monetization/claude-project/core-files/01-role-prompt.md
   and act as that operating partner. The OS rules are in 02-business-os.md.
   Current business state lives in 03-context-profile.md and 04-decision-log.md
   — update them in place when I make decisions.
   ```
2. Keep a `state/` folder next to the core files: `scoreboard.md`,
   `pipeline.md`, `voice-of-customer.md`. Claude Code reads AND writes these,
   so your OS gains persistent memory between sessions.
3. Schedule the rituals (Claude Code supports scheduled/recurring tasks —
   e.g., cron-style triggers in web sessions, or plain OS cron running
   `claude -p "Run the daily brief per prompts/daily-brief.md against state/"`):
   - Mon 08:00 — weekly brief from the active process file
   - Tue–Fri 08:00 — daily brief
   - Fri 16:00 — weekly review + monetization check, write results to `state/`
4. Every run commits its state updates — your business history becomes a
   git log.

## Level 2 — Delivery pipelines (month 2+, after first revenue)

Glue tools (n8n self-hosted ~free, Make ~$9/mo, Zapier ~$20/mo) + the Claude
API for the production steps of your specific idea.

**Example — content repurposing service (idea #3):**
```
New file in client's Drive folder (trigger)
 → transcript to Claude API with the client's voice guide + pipeline prompt
 → outputs written to a Google Doc "DRAFT — [client] — [date]"
 → Slack/email ping to YOU for the review seat
 → you approve → second automation posts/schedules via Buffer API
```

**Example — newsletter (idea #1):**
```
RSS/Reddit digest collected nightly (n8n)
 → Friday: Claude API runs the curation prompt over the week's pool
 → draft lands in your email editor as a draft, never auto-sends
```

**Example — leadgen (idea #17):**
```
New rows in raw-leads sheet
 → Claude API: enrich + score against ICP spec + draft angle
 → results to "for review" sheet → you spot-check → approved rows to client deliverable
```

**Non-negotiable pipeline rules:**
- Every pipeline ends at a HUMAN REVIEW step before anything reaches a
  customer. The review seat is in the OS for a reason.
- Every run logs: input, output, model, tokens, cost → a running sheet.
  Review the cost line in the Friday scoreboard.
- Fail loud: errors ping you immediately; never silent-skip a client
  deliverable.

## Level 3 — Customer-facing agents (month 3+, product ideas only)

For SaaS-shaped ideas (#5, #6, #8, #10, #15): the agent itself is the product.

- **Stack sketch:** your app backend → Claude API (Agent SDK if multi-step) →
  per-user usage metering → Stripe.
- **Model routing:** classification, extraction, formatting → cheap fast
  model; judgment, generation customers see, anything ambiguous → strongest
  model. This is the difference between 60% and 90% margin.
- **Observability minimum:** log every run (prompt version, latency, tokens,
  user rating), an eval set of 20+ real cases you re-run before ANY prompt
  change, and an error budget — if quality dips, roll back the prompt like
  code.
- **Guardrails:** grounding rules ("answer only from provided context"),
  refusal paths, human-handoff triggers, and rate limits per user from day 1.

## Cost control cheatsheet

| Symptom | Fix |
| --- | --- |
| Token bill growing faster than revenue | Route more steps to cheaper models; cache repeated context |
| Long documents re-sent every run | Chunk + summarize once, store the summary |
| Free users burning spend | Cap free tier hard; require card for heavy features |
| One workflow dominates spend | That's your pricing signal — charge for it by usage (model 4) |

## Automation decision test

Before automating anything, all four must be YES:

1. Ran manually ≥5 times with a written process file?
2. Produced revenue (or directly serves paying customers)?
3. Failure mode is recoverable (a human review step catches it)?
4. Saves ≥2 hrs/week (otherwise the maintenance tax isn't worth it)?

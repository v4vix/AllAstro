# Autopilot — Running the OS on a Schedule

This folder makes Level 1 of `automation/automation-setup.md` turnkey: Claude
Code sessions that fire on a schedule, read your business state, do the work,
and write the results back — no daily prompting from you.

## What "autopilot" honestly means here

Three things run without you:

1. **The rituals** — daily brief, Monday weekly brief, Friday review +
   monetization check fire on schedule and arrive drafted.
2. **The drafting** — outreach batches, content, reports, deliverable drafts
   are produced and waiting in `state/inbox.md`.
3. **The memory** — every run updates `state/`, so nothing depends on you
   remembering to paste context.

One thing deliberately does NOT run without you: **the review seat.**
Nothing is sent, published, or delivered until you approve it. That's an OS
rule (`02-business-os.md`), not a limitation — customer-facing quality and
judgment calls are your moat. Realistic time on full autopilot: ~30–45
min/day of reviewing and sending, instead of hours of producing.

Also honest: autopilot is worthless before Week 0 is done. Fill in
`03-context-profile.md` and pick an idea first — scheduled runs with no
active idea just generate noise.

## Setup with Claude Code on the web (recommended, ~10 minutes)

1. Open a Claude Code session on this repo and say:

   > Set up the agent-monetization autopilot: create scheduled triggers per
   > modules/agent-monetization/autopilot/routines.md, firing into a session
   > on this repo. My timezone is [TZ].

   Claude Code supports scheduled triggers (cron-style routines) natively —
   it will create them and confirm the schedule.
2. Each firing, the session reads `../claude-project/core-files/` +
   `state/`, runs the routine's prompt from `routines.md`, writes outputs to
   `state/inbox.md`, updates the other state files, and commits.
3. Your only job: open `state/inbox.md` (or the session) once a day, approve/
   edit/send, and jot results back — one line is enough, the Friday run
   structures it.

## Alternative: local cron + Claude Code CLI

```bash
# crontab -e   (times in your local TZ)
0 8 * * 1   cd ~/AllAstro && claude -p "$(cat modules/agent-monetization/autopilot/routines.md | sed -n '/## Monday/,/^## /p')"
0 8 * * 2-5 cd ~/AllAstro && claude -p "Run the DAILY routine in modules/agent-monetization/autopilot/routines.md"
0 16 * * 5  cd ~/AllAstro && claude -p "Run the FRIDAY routine in modules/agent-monetization/autopilot/routines.md"
```

## Files here

- `routines.md` — the exact prompt each scheduled run executes.
- `state/scoreboard.md` — weekly metrics history (Friday run appends).
- `state/pipeline.md` — prospects/customers and next actions (every run updates).
- `state/voice-of-customer.md` — quotes, objections, requests (bank grows over time).
- `state/inbox.md` — drafts awaiting YOUR review; the runs write, you clear.

## Guardrails (why this stays safe on autopilot)

Autopilot without guardrails is just automated mistakes. These are
preconditions, not suggestions:

- `05-quality-guardrails.md` is binding on every run: risk-tier labels on
  every draft, no invented specifics, `[VERIFY]` tags where sourcing is
  missing. A run that can't meet the bar outputs questions, not guesses.
- **Automatic downgrade:** the quality tripwires apply to autopilot first —
  2+ customer-visible defects from a pipeline in a month, or repeated eval
  drift, and that pipeline drops back to manual until it re-earns its level.
- Runs write to `state/` and commit — they never email, post, or message
  anyone. Sending is always the human's click.
- Every run starts by reading `04-decision-log.md`; it cannot re-open
  settled decisions or start new ideas (focus rule).
- If a run finds `03-context-profile.md` unfilled or no active idea, it
  outputs setup instructions instead of pretending to operate.

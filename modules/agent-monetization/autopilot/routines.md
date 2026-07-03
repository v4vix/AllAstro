# Autopilot Routines — Prompts for Scheduled Runs

Each scheduled run: read `../claude-project/core-files/` (role prompt is
binding), the active idea's process file, and all of `state/`. Then execute
the routine below. Write drafts to `state/inbox.md`, update the other state
files, commit with message `ops: <routine> <date>`.

If `03-context-profile.md` is unfilled or no active idea is set: stop, write
setup instructions to `state/inbox.md`, and do nothing else.

## DAILY (Tue–Fri morning)

Run `prompts/daily-brief.md` using `state/` as the source of truth instead
of pasted input. Then produce today's batch work from the weekly plan
(outreach drafts, content, deliverable drafts — whatever the active process
file's pipeline says is due) into `state/inbox.md` under today's date, each
item marked `DRAFT — needs review`. Update `state/pipeline.md` next-action
dates.

## MONDAY (weekly brief)

Run the active idea's weekly brief prompt using `state/` for context.
Output: the 3 priorities, the full first batch of drafts, and the week's
calendar of what each daily run should produce. Write the plan to the top
of `state/inbox.md`; log the week's plan one-liner in `state/scoreboard.md`.

## FRIDAY (review + monetization)

1. Run `prompts/weekly-review.md` — pull metrics from `state/scoreboard.md`
   and `state/pipeline.md`, plus whatever notes I left in `state/inbox.md`
   under "## Owner notes".
2. Run `processes/monetization-strategy.md` review.
3. Append the week's row to `state/scoreboard.md`, bank new quotes in
   `state/voice-of-customer.md`, and write the one decision I need to make
   at the TOP of `state/inbox.md`, flagged `DECISION NEEDED`.
4. If it's the last Friday of the month: run the Week 4 checkpoint
   (kill/pivot/scale) instead of the plain review.

## Rules for every run

- Drafts only — never send, post, or contact anyone.
- Max 3 priorities; no new ideas (focus rule in `02-business-os.md`).
- Anything ambiguous → a question in `state/inbox.md`, not a guess.
- Keep `state/inbox.md` clean: archive items older than 14 days to the
  bottom under "## Archive".

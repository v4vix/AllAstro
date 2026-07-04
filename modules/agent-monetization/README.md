# AI Agent Business OS — Claude Project Module

A complete, ready-to-upload kit for running a one-person AI agent business with Claude as your operating partner. Everything in this module is plain Markdown so it can be dropped directly into a Claude Project (or used with Claude Code / the API).

## What's inside

```
modules/agent-monetization/
├── README.md                        ← you are here
├── claude-project/
│   ├── core-files/                  ← upload ALL of these to your Claude Project
│   │   ├── 01-role-prompt.md        ← paste into Project custom instructions
│   │   ├── 02-business-os.md        ← your operating system (cadence, rules, metrics)
│   │   ├── 03-context-profile.md    ← fill in once: your skills, hours, capital, niche
│   │   ├── 04-decision-log.md       ← running log of decisions + experiments
│   │   └── 05-quality-guardrails.md ← binding quality policy: risk tiers, evals, incidents
│   ├── processes/
│   │   ├── _process-template.md     ← blank template for new process files
│   │   ├── monetization-strategy.md ← weekly revenue-mix analyzer
│   │   └── ideas/                   ← one process file per business idea (20)
│   └── prompts/
│       ├── week-0-setup.md          ← day one: pick + validate a niche
│       ├── week-1-validation.md
│       ├── week-2-build.md
│       ├── week-3-launch.md
│       ├── week-4-review-and-scale.md
│       ├── weekly-review.md         ← reusable every Friday
│       └── daily-brief.md           ← reusable every morning
├── monetization/
│   └── strategies-2026.md           ← 8 monetization models + hybrid playbook
├── niches/
│   └── unconventional-niches.md     ← 15 under-the-radar niches with wedge products
└── automation/
    └── automation-setup.md          ← manual → scheduled → fully automated pipeline
```

## Quickstart (30 minutes)

1. **Create a Claude Project** at claude.ai → Projects → New Project. Name it
   "Business OS".
2. **Paste `core-files/01-role-prompt.md`** into the Project's custom
   instructions field.
3. **Fill in `core-files/03-context-profile.md`** — 10 minutes of honest answers
   about your skills, time, and capital. This is the highest-leverage file.
4. **Upload** `02-business-os.md`, your filled `03-context-profile.md`,
   `04-decision-log.md`, `05-quality-guardrails.md`, and
   `monetization/strategies-2026.md` to the Project knowledge.
5. **Run `prompts/week-0-setup.md`** in a new conversation. It scores the 20
   ideas + 15 niches against your profile and picks your top 3 candidates.
6. When you commit to an idea, **upload that idea's process file** from
   `processes/ideas/` and start the Week 1 prompt.

## Operating rhythm

| When | What | File |
| --- | --- | --- |
| Every morning (5 min) | Daily brief | `prompts/daily-brief.md` |
| Monday (30 min) | Weekly brief + plan | inside each idea's process file |
| Friday (30 min) | Weekly review + decision | `prompts/weekly-review.md` |
| Friday (10 min) | Revenue-mix check | `processes/monetization-strategy.md` |
| Monthly | Kill / scale / pivot decision | `02-business-os.md` decision rules |

## Rules of the road

- **One idea at a time.** The OS enforces this. Parallel ideas at week 1 = zero
  ideas at week 12.
- **You keep the review seat.** Claude drafts, you approve. Nothing ships
  without a human pass — especially legal, medical, or financial content.
- **Log every decision** in `04-decision-log.md`. Future-you (and Claude) will
  reference it constantly.
- **Revenue before automation.** Don't build the pipeline in
  `automation/automation-setup.md` until something is selling manually.

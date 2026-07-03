# Process: Vertical AI Wrapper / Tool (SaaS)

**Idea #5** · **Monetization:** subscription SaaS ($19–99/mo) ·
**Time to first revenue:** 6–12 weeks · **Weekly hours:** 15–20

## Snapshot

A focused web tool that wraps an LLM around ONE painful workflow for ONE
profession (e.g., listing descriptions for realtors, grant summaries for
nonprofits). The wrapper's value is the workflow, templates, and domain
guardrails — not the model.

**Pros:** high margins, scalable, recurring, sellable asset.
**Cons:** needs validation before building, churn if it's a thin wrapper,
model costs at scale.
**Mitigations:** validation gate from the OS applies hard here — presell or
concierge first; store user data/outputs so switching costs grow; route
simple steps to cheap models.

## Pipeline (two modes)

**Build mode (pre-launch):**
1. Concierge the workflow manually with 3 design partners for 2 weeks.
2. Spec: Claude converts the manual process into product spec + prompt chain
   with eval cases from real partner data.
3. Ship the thinnest version (one workflow, Stripe, magic-link auth).

**Run mode (post-launch, weekly):**
1. **Input:** usage stats, support emails, cancellations, feature requests.
2. Support replies drafted; docs updated; changelog written.
3. Feature-request synthesis → ranked by revenue impact; one improvement/wk.
4. Churn: draft win-back emails for cancels; onboarding email sequence tuning.
5. **Review seat:** I approve anything touching pricing, data handling, or a
   promise to a user.

## Weekly brief prompt

> SaaS week: stats [signups, actives, MRR, churn, support threads: paste].
> Run run-mode: support drafts, feature synthesis with your ranked pick,
> this week's one improvement spec, changelog entry, and one marketing
> experiment (from strategies file) sized to ≤3 hours.

## KPIs

- Signups · activation % (did the core workflow once) · MRR · churn · token cost per user

## Pricing & offer

- $29/mo solo · $79/mo team · annual = 2 months free. Free trial 7 days, no
  free tier until acquisition demands it.

## First 3 actions

1. Pick the profession + workflow where discovery already showed people paying for a worse alternative.
2. Get 3 design partners at $10/mo founding-forever pricing before writing code.
3. Concierge their workflow manually for 2 weeks; the product spec falls out of it.

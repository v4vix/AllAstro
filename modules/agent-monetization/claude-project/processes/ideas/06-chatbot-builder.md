# Process: AI Chatbot Builder for Websites

**Idea #6** · **Monetization:** SaaS subscription or setup + retainer ·
**Time to first revenue:** 3–6 weeks · **Weekly hours:** 10–15

## Snapshot

Custom support/lead-capture chatbots trained on a business's site and docs.
Two viable shapes: (a) productized service on an existing platform
(Chatbase/Voiceflow/etc.) with setup + monthly management, or (b) my own
thin SaaS later. Start with (a) — revenue in weeks, no infra.

**Pros:** recurring, clear ROI story (captured leads, deflected tickets),
every SMB site is a prospect.
**Cons:** crowded space, platform dependency in shape (a), hallucination risk
on business facts.
**Mitigations:** niche down to one industry so the knowledge-base template is
reusable; strict grounding ("answer only from the knowledge base, otherwise
offer human handoff"); monthly transcript review as part of the retainer.

## Pipeline (per client)

1. **Onboard:** crawl/collect site, FAQs, policies → Claude structures into a
   clean knowledge base (Q&A pairs, policies, escalation rules).
2. **Configure:** persona prompt (tone, boundaries, handoff triggers, "never
   answer" topics), lead-capture questions.
3. **Test:** Claude generates 40 test questions incl. adversarial/off-topic;
   I run them and we fix gaps before launch.
4. **Monthly:** transcript review → unanswered-question report → KB updates →
   client report (chats, leads captured, top questions).
5. **Review seat:** I sign off the KB with the client — bot never guesses
   prices, availability, or policy.

## Weekly brief prompt

> Chatbot week: clients + transcript exports [paste]. Run monthly reviews
> due, produce KB update drafts and client reports, and draft 5 pitches to
> [industry] sites I've listed that have no chat or a dumb chat widget —
> pitch = 3 real questions their site can't answer today.

## KPIs

- Clients · MRR · leads captured per client · unanswered-question rate · churn

## Pricing & offer

- Setup $750–1,500 (KB build + config + testing) + $150–400/mo management.
- Industry template makes each subsequent client ~3x faster — margin grows.

## First 3 actions

1. Pick one industry (clinics, gyms, law firms, property managers).
2. Build a demo bot for a well-known local business (unpitched) as the showpiece.
3. Pitch 10 businesses with a link to the demo answering THEIR industry's questions.

# Process: Niche Job Board

**Idea #19** · **Monetization:** paid job posts + featured listings + candidate alerts ·
**Time to first revenue:** 6–12 weeks · **Weekly hours:** 8–12

## Snapshot

A job board for one specific niche too small for LinkedIn to serve well
(e.g., climate-tech ops roles, church media staff, veterinary practice
managers). Employers pay to reach a concentrated audience; candidates come
free. Network effects once both sides show up — but cold-start is the boss
fight.

**Pros:** network effects moat, multiple revenue lines (posts, featured,
newsletter sponsorship, candidate services), mostly automatable ops.
**Cons:** chicken-and-egg cold start, competition from free channels,
moderation/quality work.
**Mitigations:** solve cold start by aggregating public listings first
(free, curated) to build candidate traffic, THEN sell posts on the traffic;
pair with a jobs newsletter (idea #1 synergy) as the distribution engine.

## Pipeline (weekly)

1. **Aggregate:** I collect niche openings from company pages/ATS feeds;
   Claude normalizes into consistent listings (title, comp if stated,
   location, one-line pitch) and tags them.
2. **Curate + moderate:** quality filter — Claude flags spam, MLM-ish,
   ghost-job patterns for my rejection.
3. **Newsletter:** weekly "N best [niche] jobs" issue with commentary (feeds
   candidate side).
4. **Match:** candidate alert emails by saved filters; Claude writes the
   "why this fits you" line per match.
5. **Sales:** Claude drafts pitches to companies whose (free, aggregated)
   listing performed well: "your posting got N clicks — feature it / post
   direct next time."
6. **Review seat:** I approve all moderation rejections and every employer
   pitch; salary/remote tags must match the source posting.

## Weekly brief prompt

> Job board week: new raw listings [paste/links], traffic + click stats
> [paste], employer pipeline [status]. Run the pipeline: normalized
> listings, moderation flags, this week's newsletter draft, and pitches to
> the top 3 companies by listing clicks.

## KPIs

- Listings live · candidate email list · clicks per listing · paid posts sold · MRR

## Pricing & offer

- Standard post $99/30 days · Featured $199 · Newsletter sponsorship $150/issue ·
  Post bundle 5-pack $399. All free during the 8-week traffic-building phase.

## First 3 actions

1. Pick a niche where I can find 30 current openings and 3 active communities today.
2. Launch with 30 aggregated listings + the first newsletter issue.
3. Grow the candidate list to 300 before selling the first post.

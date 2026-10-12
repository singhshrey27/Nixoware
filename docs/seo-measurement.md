# SEO and enquiry measurement

Preferred public origin: `https://www.nixoware.com`. Keep redirects, canonicals, structured data, internal absolute URLs, robots, and sitemap URLs consistent with this origin. The application already redirects public host/protocol variants to HTTPS with `www`; query parameters are preserved for campaign attribution.

## Compare consistent Search Console exports

The two exports supplied on 12 October 2026 contain daily rows from 24 September through 10 October 2026, although both date filters say “Last 3 months”. The domain export labels its search type “Web”; the HTTPS www prefix export labels it “Web (text-based)”. Keep their baselines separate and confirm matching filters before a before-and-after comparison.

Use the same existing property for both exports. A Domain property includes host and protocol variants; a URL-prefix property covers its specified prefix. If using URL-prefix reporting for the preferred site, use `https://www.nixoware.com/`. Do not combine totals from different properties as independent visits.

Record property, export date, date range, search type, device, country, and any query/page filters. Use equal, complete comparison periods, such as 28 complete days before release and 28 complete days after release. Allow time for crawling and evaluate changes alongside other campaigns and releases.

Export full Performance totals plus query, page, device, and country breakdowns. Compare desktop and mobile separately, and distinguish branded from non-branded searches using the same query filter. Compare CTR with impressions and position, since a changing query mix can alter all three.

Separate query and page exports do not identify exactly which query generated each page's clicks. Filter by a specific page before exporting queries when investigating a page. Neither a short export nor this code change establishes a complete three-month trend or a causal ranking gain.

## Review existing pages first

- `/blog/website-development-cost-in-india` → `/web-development`
- `/blog/mobile-app-development-cost-guide` → `/mobile-app-development`
- `/blog/software-development-cost-in-india` → `/software-development`
- `/blog/5000-vs-50000-website-cost-india` → `/web-development`
- `/blog/seo-friendly-website-development-guide` → `/web-development`
- `/blog/website-development-in-balrampur-uttar-pradesh` → `/web-development`
- `/blog/ai-agriculture-app-development-balrampur` → `/mobile-app-development`

Check indexing and Google-selected canonicals in URL Inspection. Review the actual titles/snippets shown for relevant queries, landing-page clarity, service-link clicks, and enquiries before adding more articles. Submit the preferred sitemap after deployment if the connected Search Console property needs updating; this repository cannot change that account setting.

## Events implemented in the website

| Event | Trigger | Interpretation |
| --- | --- | --- |
| `service_click` | A visitor follows a link to a recognised service page | Interest in a service; not an enquiry |
| `contact_click` | WhatsApp, phone, or email link activation | Contact intent; not confirmation that a message or call happened |
| `generate_lead` | The existing enquiry form receives a successful API response and confirms the request | An accepted form enquiry, not a qualified lead |

The shared tracker includes `page_path`, `content_group`, placement, and either contact method or service destination. It excludes link URLs, query strings, message text, names, email addresses, phone numbers, and enquiry references. The React implementation uses one document click listener and the existing GA queue rather than adding an analytics SDK.

The current pages expose direct contact links. `ContactForm` exists but is not currently mounted on a page. Its success event will be usable when that form is rendered and its configured enquiry API is operational; it does not create form enquiries on today's contact page. Failed form submissions do not emit `generate_lead`.

In GA4, verify events in DebugView or Realtime after deployment. Register event parameters as event-scoped custom dimensions if needed for reporting. Mark accepted enquiries as key events according to your reporting needs; count contact clicks separately. Values/currency should come from a defensible business model, not an invented revenue amount.

## Qualified leads require a sales outcome

Record each actual enquiry in the team's CRM or lead log: enquiry date, available source/landing page, requested service, fit, next step, qualification decision, and eventual outcome. Record an unknown source as unknown. A contact click alone cannot provide that record or establish lead quality.

Define a qualified lead consistently, for example: a relevant service need, a reachable decision maker, and a plausible scope, budget, and timeline. Review the decision after contact rather than inferring qualification from a page visit or click.

Google's `qualify_lead` event should be sent only after a confirmed qualification decision. Automatic attribution of that later outcome requires a CRM/backend integration and an appropriate consent-aware identifier; no such integration is present in this repository. Do not put customer contact details in GA4 event parameters. Until integration exists, compare confirmed and qualified enquiries from the lead log alongside GA4 and Search Console, and avoid claiming per-query lead attribution.

Sources: [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [GA4 recommended lead events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events).
